import { MapPin } from "lucide-react";

export function ContactMap() {
  return (
    <section className="mb-20">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
          Vị trí của chúng tôi
        </h2>
        <p className="text-muted-foreground">
          Tọa lạc tại trung tâm Quận 1, dễ dàng di chuyển bằng mọi phương tiện
        </p>
      </div>

      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {/* Placeholder for Google Maps */}
        <div className="aspect-[16/9] bg-muted flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.640590312027!2d106.65215397570381!3d10.838792558038898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a1ba564415%3A0x37225ba49f909f54!2zNDcgxJAuIFPhu5EgMTksIFBoxrDhu51uZyA4LCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1755443257147!5m2!1svi!2s"
            width="1200"
            height="650"
            style={{ borderRadius: "8px", border: 0}}
            loading="lazy"
          ></iframe>
        </div>

        {/* Directions */}
        <div className="absolute bottom-4 left-4 right-4">
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
        </div>
      </div>
    </section>
  );
}
