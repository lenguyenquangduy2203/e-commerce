import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import SignInIsland from "../islands/SignIn.tsx";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      {/* Background with dark overlay */}
      <div class="fixed inset-0 bg-cover bg-center z-[-1]">
        <div
          class="absolute inset-0 bg-black/60"
          style="background-image: url('/images/background/background_signin.jpg');"
        ></div>
      </div>

      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md z-10">
          <a href="/" class="flex justify-center mb-6">
            <img
              src="/images/logo/online-shop.png"
              alt="E-commerce Logo"
              class="w-16 h-16"
            />
          </a>

          <h2 class="text-4xl font-extrabold text-center mb-4 text-white">Sign In</h2>
          <p class="text-center text-white/80 mb-6">
            Welcome back! Please sign in to continue.
          </p>

          <SignInIsland />
        </div>
      </div>
    </>
  );
}