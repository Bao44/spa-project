"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";

interface ServiceTableProps {
  searchTerm: string;
  categoryFilter: string;
  onEditService: (service: any) => void;
  refreshKey: number; // Thêm prop này để trigger refetch
}

export function ServiceTable({
  searchTerm,
  categoryFilter,
  onEditService,
  refreshKey,
}: ServiceTableProps) {
  const [services, setServices] = useState([]);

  // Hàm fetchServices độc lập để có thể gọi lại khi cần
  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setServices(data);
      } else {
        throw new Error(data.error || "Lỗi khi lấy danh sách dịch vụ");
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi lấy danh sách dịch vụ");
    }
  };

  // Gọi fetchServices khi component mount hoặc refreshKey thay đổi
  useEffect(() => {
    fetchServices();
  }, [refreshKey]);

  const handleDeleteService = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Lỗi khi xóa dịch vụ");
      }

      // Refetch full list after successful delete
      await fetchServices(); // Gọi lại fetchServices để load lại toàn bộ danh sách
      toast.success("Xóa thành công");
    } catch (error: any) {
      toast.error(error.message || "Đã có lỗi xảy ra khi xóa dịch vụ.");
    }
  };

  const filteredServices = services.filter((service: any) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      massage: "bg-amber-700 text-white",
      skincare: "bg-green-500 text-white",
      body: "bg-purple-500 text-white",
      facial: "bg-blue-500 text-white",
      package: "bg-pink-500 text-white",
    };

    const categoryNames = {
      massage: "Massage",
      skincare: "Chăm sóc da",
      body: "Chăm sóc cơ thể",
      facial: "Chăm sóc mặt",
      package: "Gói dịch vụ",
    };

    return (
      <Badge
        className={
          categoryColors[category as keyof typeof categoryColors] ||
          "bg-gray-500 text-white"
        }
      >
        {categoryNames[category as keyof typeof categoryNames] || category}
      </Badge>
    );
  };

  return (
    <Card className="bg-admin-card border-admin-border">
      <CardHeader>
        <CardTitle className="text-admin-foreground">
          Danh sách dịch vụ ({filteredServices.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-admin-border">
          <Table>
            <TableHeader>
              <TableRow className="border-admin-border">
                <TableHead className="text-admin-card-foreground">
                  Tên dịch vụ
                </TableHead>
                <TableHead className="text-admin-card-foreground">
                  Danh mục
                </TableHead>
                <TableHead className="text-admin-card-foreground">
                  Giá
                </TableHead>
                <TableHead className="text-admin-card-foreground">
                  Thời gian
                </TableHead>
                <TableHead className="text-admin-card-foreground">
                  Đánh giá
                </TableHead>
                <TableHead className="text-admin-card-foreground text-right">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service: any) => (
                <TableRow key={service.id} className="border-admin-border">
                  <TableCell>
                    <div>
                      <p className="font-medium text-admin-foreground">
                        {service.name}
                      </p>
                      <p className="text-sm text-admin-muted-foreground line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryBadge(service.category)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-admin-foreground">
                        {service.price.toLocaleString()}₫
                      </p>
                      {service.originalPrice &&
                        service.originalPrice > service.price && (
                          <p className="text-sm text-admin-muted-foreground line-through">
                            {service.originalPrice.toLocaleString()}₫
                          </p>
                        )}
                    </div>
                  </TableCell>
                  <TableCell className="text-admin-foreground">
                    {service.duration} phút
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-admin-foreground">
                        {service.rating || "N/A"}
                      </span>
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-admin-muted-foreground">
                        ({service.reviewCount || 0})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-admin-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="">
                        <DropdownMenuItem className="">
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEditService(service)}
                          className="text-admin-popover-foreground hover:bg-admin-muted"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteService(service.id)}
                          className="text-admin-destructive hover:bg-admin-destructive/10"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
