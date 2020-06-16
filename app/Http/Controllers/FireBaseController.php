<?php

namespace App\Http\Controllers;

use App\Clientes;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
use PHPUnit\Framework\Constraint\Count;
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

class FireBaseController extends Controller {

    public function noti_usua_fire() {
        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array());
        $api_serv = $_REQUEST['endpoint'];
        $llav_publ = $_REQUEST['publicKey'];
        $tock_user = $_REQUEST['authToken'];
        $codi_usua = $_REQUEST['codi_usua'];

        if (!isset($api_serv)) {
            echo 'Error: not a subscription';
            return;
        } else {
            
        }
        //guardar los datos.


        $validar["mensaje"] = "* Registro satisfactorio Suscripcion " . $api_serv.'  llave: '.$llav_publ.' tocken usuario :'.$tock_user.' usuario: '.$codi_usua;
        return json_encode($validar);
    }

    public function envi_usua_fire() {
        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array());
       
        $susc_usua = $_REQUEST['susc_usua'];
            //obtener llaves y enviara notificaiones
       $myArr = array('endpoint' => "https://fcm.googleapis.com/fcm/send/dZ0hNeLnLsU:APA91bHxhEg8Wzr_Y847GAse4Z_gmIywCndm_H0URS1JTnwjwykJSgnbUuLbwhXasD6OiuvCA1nJ8q7M-_ESMerV7wlsGW4B-goSHFaySlDa7KCRD2QNJk_empAGr-w5MTlwnQDdAS46",
             "expirationTime"=>null, "keys"=> [ "p256dh" => "BMyaoubsOvStb8QICgyOsYJ1M8UsCNcqfTC8O5X+NbzRVAbICFky9XZjNCU2TA6wwC6KhqUr24LoR5k/mGl6Z6w=","auth"=>"TzLOEcntqZtdIJ/r8PqYFw=="], 
          "contentEncoding"=>"aes128gcm");
        
         $asd =  json_encode($myArr);
       // print_r($asd);
        $subscription =  Subscription::create(json_decode($susc_usua, true));
        $subscription2 = Subscription::create(json_decode($asd, true));
        $auth = array(
            'VAPID' => array(
                'subject' => 'mailto:antony.rodriguez@mimco.com.pe',
                'publicKey' => 'BPjBa9oNt2QXRsbN8iVAH4EhTiiJwbDzR4eDwl8YMashWdIlw3gKeZGZ_nsnUIvY7qmr0MbFSsZ1Xlt9IWMPEdc', // don't forget that your public key also lives in app.js
                'privateKey' => 'j5ybmWlfGJTBNFYNJ3TntpTZPtC0SPV4M6abL6Qx1l4', // in the real world, this would be in a secret file
            ),
        );
        $webPush = new WebPush($auth);
        $res = $webPush->sendNotification(
                $subscription, "Nuevas Notificaciones"
        );
        $res1 = $webPush->sendNotification(
                $subscription2, "Nuevas Notificaciones"
        );
// handle eventual errors here, and remove the subscription from your server if it is expired
        foreach ($webPush->flush() as $report) {
            $endpoint = $report->getRequest()->getUri()->__toString();
            if ($report->isSuccess()) {
                //echo "[v] Message sent successfully for subscription {$endpoint}.";
                $validar["mensaje"] = "* Registro satisfactorio {$endpoint}";
            } else {
                //echo "[x] Message failed to sent for subscription {$endpoint}: {$report->getReason()}";
                $validar["mensaje"] = "* Registro satisfactorio {$endpoint}: {$report->getReason()}";
            }
        }
        
        return json_encode($validar);
    }

}
