"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  User,
  Menu,
  Sun,
  Moon,
  ShoppingBag,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useUser } from "@/components/UserContext";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useUser();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Dịch vụ", href: "/services" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Đặt lịch", href: "/booking" },
    { name: "Liên hệ", href: "/contact" },
  ];

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      // Close cart dropdown when clicking outside
      const cartElement = document.querySelector("[data-cart-dropdown]");
      if (cartElement && !cartElement.contains(event.target as Node)) {
        setIsCartDialogOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Bella Spa & Nail
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-pink-500 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 cursor-pointer"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Shopping Cart Dropdown */}
            <div className="relative" data-cart-dropdown>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 cursor-pointer"
                onClick={() => setIsCartDialogOpen(!isCartDialogOpen)}
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>

              {isCartDialogOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-background border rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-pink-500" />
                        Giỏ hàng
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCartDialogOpen(false)}
                        className="h-6 w-6"
                      >
                        ×
                      </Button>
                    </div>

                    {user ? (
                      <div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Giỏ hàng của {user.first_name}
                        </p>
                        <div className="space-y-4">
                          {/* Cart items would go here - currently empty */}
                          <div className="text-center text-muted-foreground py-8">
                            <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Giỏ hàng của bạn đang trống</p>
                            <p className="text-sm">
                              Thêm sản phẩm để bắt đầu mua sắm!
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsCartDialogOpen(false)}
                            className="flex-1"
                          >
                            Đóng
                          </Button>
                          <Link
                            href="/products"
                            onClick={() => setIsCartDialogOpen(false)}
                          >
                            <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                              Xem sản phẩm
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Bạn cần đăng nhập để xem giỏ hàng và thực hiện mua
                          sắm.
                        </p>
                        <div className="text-center mb-4">
                          <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                          <p className="text-muted-foreground text-sm">
                            Đăng nhập để lưu sản phẩm yêu thích và theo dõi đơn
                            hàng của bạn.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsCartDialogOpen(false)}
                            className="flex-1"
                          >
                            Đóng
                          </Button>
                          <Link
                            href="/login"
                            onClick={() => setIsCartDialogOpen(false)}
                          >
                            <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                              Đăng nhập
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 h-9 px-3 cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials(user.first_name, user.last_name)}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user.first_name}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-muted-foreground border-b">
                        {user.first_name} {user.last_name}
                        <div className="text-xs">{user.email}</div>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Thông tin cá nhân
                      </Link>
                      <Link
                        href="/bookings"
                        className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Lịch hẹn của tôi
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hidden sm:flex"
                >
                  <User className="h-4 w-4 mr-2" />
                  Đăng nhập
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium hover:text-pink-500 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        className="text-lg font-medium hover:text-pink-500 transition-colors border-t pt-6"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Thông tin cá nhân
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="text-lg font-medium text-red-500 text-left"
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="text-lg font-medium text-pink-500 border-t pt-6"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
