<?php

namespace App\Http\Controllers;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Charge;

use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function charge(Request $request)
    {
        try {

            Stripe::setApiKey('sk_test_51KlF95HffVkbvH1F2tsNeTHjfDay3RONtOn8HjNyypAHlHgJqrMU6hyvEcsOXtSExh7ugRwdKhv9d4hrRxcydFbm00dfuN2zU9');

            $customer = Customer::create(array(
                'email' => $request->email,
                'source'  => $request->id
            ));

            $charge = Charge::create(array(
                'customer' => $customer->id,
                'amount'   => $request->amount,
                'currency' => 'EUR'
            ));

            return response()->json('Funciona!');

        } catch (Exception $ex) {
            return response()->json(['No ha sido posible!', $ex]);
        }
        
    }
}
