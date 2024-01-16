<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LuckyController
{
    #[Route('/lucky/number')]
    public function number(Request $request): JsonResponse
    {
        $postParams = $request->request->all();
        $queryParams = $request->query->all();

        $number = random_int(0, 100);

        return new JsonResponse(['lucky_number' => $number]);
    }
}
