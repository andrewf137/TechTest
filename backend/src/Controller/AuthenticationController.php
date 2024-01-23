<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class AuthenticationController extends AbstractController
{
    #[Route('api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        try {
            $username = $request->getPayload()->get('username');
            $email = $request->getPayload()->get('email');
            $plaintextPassword = $request->getPayload()->get('password');

            $user = new User();
            $user->setUsername($username);
            $user->setEmail($email);
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $plaintextPassword
            );
            $user->setPassword($hashedPassword);

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json(['User successfully registered']);
        } catch (\Exception|\Error $e) {
            return $this->buildErrorMessage($e);
        }
    }

    #[Route('api/logout', name: 'api_logout', methods: ['GET'])]
    public function logout(Security $security, ): Response
    {
        // Logout the user in on the current firewall
        // No need for CSRF Token validation as we are using JWT
        $security->logout(validateCsrfToken: false);
        return $this->json(['User successfully logged out']);
    }

    /**
     * @param \Exception|\Error $e
     * @return JsonResponse
     */
    private function buildErrorMessage(\Exception|\Error $e): JsonResponse
    {
        /** @var int $statusCode */
        $statusCode = $this->isValidHttpStatus($e->getCode()) ?: 500;

        return $this->json([
            'error' => \sprintf(
                    'Error when registering the user: %s',
                    $e->getMessage())
        ], $statusCode);
    }

    /**
     * @param int $code
     * @return bool
     */
    private function isValidHttpStatus(int $code) : bool
    {
        return array_key_exists($code, Response::$statusTexts);
    }
}
