"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceTable } from "@/components/admin/services/Table";
import { ServiceForm } from "@/components/admin/services/Form";

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleAddService = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingService(null);
  };

  return (
    <div className="space-y-6 ml-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-admin-foreground">
            Quản lý dịch vụ
          </h1>
          <p className="text-admin-card-foreground">
            Thêm, chỉnh sửa và quản lý các dịch vụ spa
          </p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddService}
              className="bg-black text-white hover:bg-gray-800 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Thêm dịch vụ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white border-admin-border">
            <DialogHeader>
              <DialogTitle className="text-admin-foreground">
                {editingService ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
              </DialogTitle>
            </DialogHeader>
            <ServiceForm service={editingService} onClose={handleFormClose} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card className="bg-admin-card border-admin-border">
        <CardHeader>
          <CardTitle className="text-admin-foreground">Bộ lọc</CardTitle>
          <CardDescription className="text-admin-card-foreground">
            Tìm kiếm và lọc dịch vụ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm dịch vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-admin-background border-admin-border text-admin-foreground"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-admin-background border-admin-border text-admin-foreground">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent className="border-admin-border z-[10]">
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="massage">Massage</SelectItem>
                <SelectItem value="skincare">Chăm sóc da</SelectItem>
                <SelectItem value="body">Chăm sóc cơ thể</SelectItem>
                <SelectItem value="facial">Chăm sóc mặt</SelectItem>
                <SelectItem value="package">Gói dịch vụ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <ServiceTable
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        onEditService={handleEditService}
      />
    </div>
  );
}
