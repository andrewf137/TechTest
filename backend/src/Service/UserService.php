<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Context\Normalizer\JsonSerializableNormalizerContextBuilder;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class UserService
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    /**
     * @param int $id
     * @return string
     */
    public function getUser(int $id): string
    {
        /** @var User $user */
        $user = $this->entityManager->getRepository(User::class)->find($id);

        $context = (new JsonSerializableNormalizerContextBuilder())
            ->withGroups('list_users')
            ->toArray();

        return $this->serializer->serialize($user, 'json', $context);
    }

    /**
     * @return string
     */
    public function getUsers(): string
    {
        /** @var array $users */
        $users = $this->entityManager->getRepository(User::class)->findAll();

        /** @var array $context */
        $context = (new JsonSerializableNormalizerContextBuilder())
            ->withGroups('list_users')
            ->toArray();

        return $this->serializer->serialize($users, 'json', $context);
    }
}