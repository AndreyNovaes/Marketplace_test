'use client'

/**
 * Footer Component - Rodapé principal da aplicação
 * Inclui links de navegação, redes sociais e informações com data-testid
 */

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300" data-testid="main-footer">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Receba nossas ofertas</h3>
              <p className="text-sm">Inscreva-se para receber promoções exclusivas</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                data-testid="newsletter-input"
              />
              <button
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                data-testid="newsletter-button"
              >
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quantum Market</h4>
            <p className="text-sm mb-4">
              O marketplace mais completo do Brasil com os melhores produtos de tecnologia e eletrônicos.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                data-testid="footer-facebook"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                data-testid="footer-twitter"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                data-testid="footer-instagram"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                data-testid="footer-youtube"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-white transition-colors" data-testid="footer-help">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors" data-testid="footer-shipping">
                  Prazos e Entregas
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors" data-testid="footer-returns">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white transition-colors" data-testid="footer-warranty">
                  Garantia
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors" data-testid="footer-faq">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Sobre</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors" data-testid="footer-about">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors" data-testid="footer-careers">
                  Trabalhe Conosco
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="hover:text-white transition-colors" data-testid="footer-sellers">
                  Seja um Vendedor
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors" data-testid="footer-privacy">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors" data-testid="footer-terms">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span data-testid="footer-address">
                  Av. Paulista, 1000<br />
                  São Paulo - SP, 01310-100
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:08007776666" className="hover:text-white transition-colors" data-testid="footer-phone">
                  0800 777 6666
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:contato@quantummarket.com.br" className="hover:text-white transition-colors" data-testid="footer-email">
                  contato@quantummarket.com.br
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-4 text-sm">
              <p className="font-medium text-white mb-1">Horário de Atendimento:</p>
              <p data-testid="footer-hours">Seg - Sex: 8h às 20h<br />Sáb: 9h às 18h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p data-testid="footer-copyright">
              © {currentYear} Quantum Market. Todos os direitos reservados.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500">Formas de pagamento:</span>
              <div className="flex items-center gap-2" data-testid="footer-payment-methods">
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs">VISA</div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs">MC</div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs">ELO</div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs">PIX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
