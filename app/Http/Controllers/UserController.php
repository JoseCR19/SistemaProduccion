<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return view('layout.admin');
    }

    public function login() {
        return view('Login.login');
    }

    public function recuperarcontrasena() {
        return view('Login.olvidar_contrasena');
    }

    public function listarusuarios() {
        return view('Login.listar_usuario');
    }

    public function valiurlrecucontra($slashData = null) {

        $clave = [
            'varClavUsua' => $slashData,
        ];


        $url = "http://192.168.0.120:8081/MimcoSeguridad/public/index.php/mens_conf";
        $ch5 = curl_init($url);

        curl_setopt($ch5, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch5, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch5, CURLOPT_POST, true);
        curl_setopt($ch5, CURLOPT_POSTFIELDS, $clave);
        $data = curl_exec($ch5);
        $datos_array = json_decode($data, true);
        $array_temp = $datos_array['data'];

        if ($mensaje == "Invalido.") {

            return view('Login.recuperar_invalido');
        } else {

            return view('Login.recuperar_contrasena', ['data' => $mensaje]);
        }
    }

    public function redireccionar() {
        return view('Login.redireccionar_login');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        //
    }

}
