import React from "react";

const Newsletter = () => {
  return (
    <section id="newsletter" className="bg-wood-brown text-white py-16 px-4">
      <div className="container mx-auto text-center">
        {/* Título da seção */}
        <h2 className="text-4xl font-bold mb-4 animate__animated animate__fadeInDown">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg mb-8 animate__animated animate__fadeInDown animate__delay-1s">
          Stay updated with the latest books, events, and exclusive offers!
        </p>

        {/* Formulário de inscrição */}
        <div className="max-w-lg mx-auto animate__animated animate__fadeInUp animate__delay-2s">
          <form className="flex flex-col gap-6">
            {/* Input com design mais moderno */}
            <input
              type="email"
              name="email"
              className="bg-white text-wood-brown border border-wood-brown p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-wood-brown focus:border-transparent transition-all duration-300 ease-in-out placeholder:text-wood-brown"
              placeholder="Enter your email"
              required
            />

            {/* Botão elegante com fundo branco e texto castanho */}
            <button
              type="submit"
              className="bg-white text-wood-brown border-2 border-wood-brown px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:bg-wood-brown hover:text-white hover:scale-105 hover:border-white hover:border-[1px] hover:delay-100"
            >
              Subscribe Now
            </button>
          </form>
        </div>

        {/* Mensagem extra */}
        <div className="mt-12">
          <p className="text-sm italic text-white animate__animated animate__fadeIn animate__delay-3s">
            *We respect your privacy. No spam guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
