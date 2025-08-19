import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Làm thế nào để đặt lịch hẹn?",
    answer:
      "Bạn có thể đặt lịch hẹn qua website, gọi điện thoại, hoặc nhắn tin Zalo. Chúng tôi sẽ xác nhận lịch hẹn trong vòng 30 phút và gửi thông tin chi tiết qua SMS/email.",
  },
  {
    question: "Có cần đặt cọc trước không?",
    answer:
      "Không cần đặt cọc trước. Bạn chỉ cần thanh toán khi sử dụng dịch vụ tại spa. Chúng tôi chấp nhận thanh toán bằng tiền mặt, thẻ, và chuyển khoản.",
  },
  {
    question: "Nếu muốn hủy hoặc đổi lịch hẹn thì sao?",
    answer:
      "Vui lòng thông báo trước ít nhất 2 giờ để hủy hoặc đổi lịch hẹn. Bạn có thể gọi điện hoặc nhắn tin để thay đổi. Không có phí hủy lịch.",
  },
  {
    question: "Spa có phục vụ khách nam không?",
    answer:
      "Có, chúng tôi phục vụ cả khách nam và nữ. Chúng tôi có khu vực riêng biệt và đội ngũ therapist chuyên nghiệp cho từng giới tính.",
  },
  {
    question: "Có ưu đãi gì cho khách hàng thường xuyên?",
    answer:
      "Chúng tôi có chương trình tích điểm VIP với nhiều ưu đãi: giảm giá, quà tặng sinh nhật, ưu tiên đặt lịch, và các gói combo đặc biệt.",
  },
  {
    question: "Spa có đảm bảo vệ sinh an toàn không?",
    answer:
      "Tuyệt đối! Chúng tôi tuân thủ nghiêm ngặt các tiêu chuẩn vệ sinh: khử trùng dụng cụ, thay khăn sạch cho mỗi khách, và kiểm tra sức khỏe nhân viên định kỳ.",
  },
];

export function ContactFAQ() {
  return (
    <section>
      <Card className="bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Câu hỏi thường gặp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
