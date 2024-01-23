<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class DefaultController
 * @package App\Controller
 */
class DefaultController extends AbstractController
{
    #[Route('/', name: 'default', methods: ['GET'])]
    public function indexAction()
    {
        return $this->redirect($this->generateUrl('home'));
    }

    #[Route('app/', name: 'home', methods: ['GET'])]
    public function appHome()
    {
        return new Response();
    }

//    #[Route('app/home', name: 'app_home', methods: ['GET'])]
//    public function appHome2()
//    {
//        return new Response();
//    }
}
