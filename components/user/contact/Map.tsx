"use client";

import { motion } from "framer-motion";

export function ContactMap() {
  return (
    <section className="mb-20">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
          Vị trí của chúng tôi
        </h2>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Tọa lạc tại trung tâm Quận 1, dễ dàng di chuyển bằng mọi phương tiện
        </motion.p>
      </motion.div>

      <motion.div
        className="relative rounded-lg overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="aspect-[16/9] bg-muted flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.640590312027!2d106.65215397570381!3d10.838792558038898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a1ba564415%3A0x37225ba49f909f54!2zNDcgxJAuIFPhu5EgMTksIFBoxrDhu51uZyA4LCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1755443257147!5m2!1svi!2s"
            width="1200"
            height="650"
            style={{ borderRadius: "8px", border: 0 }}
            loading="lazy"
          ></iframe>
        </div>

        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">
              Hướng dẫn đi lại:
            </h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Xe máy: Có chỗ gửi xe miễn phí</p>
              <p>• Ô tô: Bãi đỗ xe ngầm tòa nhà</p>
              <p>• Bus: Tuyến 18, 24, 55</p>
              <p>• Metro: Ga Bến Thành (200m)</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}