'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '~/components/custom/container';

export default function CompanyAccess() {
  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <motion.h2
          className="text-3xl font-bold mb-12 text-center text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          アクセス
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              所在地・連絡先
            </h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <MapPin
                  size={20}
                  className="mr-2 flex-shrink-0 text-primary mt-1"
                />
                <div>
                  <p className="font-semibold">本社</p>
                  <a
                    href="https://maps.google.com/?q=岩手県大船渡市盛町字みどり町４－１２"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    〒022-0003
                    <br />
                    岩手県大船渡市盛町字みどり町4-12
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Phone size={20} className="mr-2 flex-shrink-0 text-primary" />
                <a
                  href="tel:0192262160"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  電話/FAX: 0192-26-2160
                </a>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Mail size={20} className="mr-2 flex-shrink-0 text-primary" />
                <a
                  href="mailto:nkikaku@crocus.ocn.ne.jp"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  メール: nkikaku@crocus.ocn.ne.jp
                </a>
              </motion.div>
              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Clock
                  size={20}
                  className="mr-2 flex-shrink-0 text-primary mt-1"
                />
                <div>
                  <p className="font-semibold">営業時間</p>
                  <p className="text-gray-600">
                    9:00〜18:00（定休日: 日・祝日）
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="rounded-lg overflow-hidden shadow-md h-80 bg-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Google Map埋め込み */}
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3096.9520469562613!2d141.71424299999998!3d39.084790000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f88a0d4d07c3ba7%3A0x550fde9c9db73988!2z44OL44Kk44OM44Oe5LyB55S75Y2w5Yi3!5e0!3m2!1sja!2sjp!4v1743004189589!5m2!1sja!2sjp"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ニイヌマ企画印刷の地図"
                className="rounded-lg w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
