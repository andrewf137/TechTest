<?php

namespace App\Controller;

use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/api/users/{id}', name: 'getUser', methods: ['GET'])]
    public function getUserAction(UserService $userService, int $id): Response
    {
        return new Response($userService->getUser($id));
    }

    #[Route('/api/users', name: 'getUsers', methods: ['GET'])]
    public function getUsersAction(UserService $userService): Response
    {
        return new Response($userService->getUsers());
    }
}
