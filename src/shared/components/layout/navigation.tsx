"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { MenuTreeResponse, MenuItemTreeNode } from "@/features/menu/types";
import { resolveMenuUrl } from "@/features/menu/utils/resolve-menu-url";
import { getLocalizedField } from "@/features/article/utils/map-article";

interface NavigationProps {
  initialMenu: MenuTreeResponse | null;
}

export function Navigation({ initialMenu }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("common");

  // Lấy danh sách items động từ backend (nếu có), nếu không có dùng mảng rỗng []
  const menuItems: MenuItemTreeNode[] = initialMenu?.items || [];

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const handleDropdownToggle = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center">
        <ul className="flex items-center gap-8 lg:gap-10">
          {menuItems.filter(item => item.is_visible).map((item) => {
            const hasSubmenu = item.children && item.children.length > 0;
            const targetUrl = resolveMenuUrl(item);
            const title = getLocalizedField<string>(item, "title", locale);

            return (
              <li key={item.id} className="relative group py-4">
                {hasSubmenu ? (
                  <button className="flex items-center gap-1 text-slate-700 font-semibold hover:text-brand-darkred transition text-[14px] lg:text-[15px] cursor-pointer">
                    {title}
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    href={targetUrl}
                    target={item.open_in_new_tab ? "_blank" : undefined}
                    className="text-slate-700 font-semibold hover:text-brand-darkred transition text-[14px] lg:text-[15px]"
                  >
                    {title}
                  </Link>
                )}

                {/* Submenu cấp 1 */}
                {hasSubmenu && (
                  <ul className="absolute left-0 top-[100%] hidden group-hover:block bg-white shadow-md border border-slate-100 rounded-none py-2 min-w-[240px] z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.children.filter(sub => sub.is_visible).map((subItem) => {
                      const hasSubmenuLevel2 = subItem.children && subItem.children.length > 0;
                      const subTargetUrl = resolveMenuUrl(subItem);
                      const subTitle = getLocalizedField<string>(subItem, "title", locale);

                      return (
                        <li key={subItem.id} className="relative group/sub px-1 py-0.5">
                          {hasSubmenuLevel2 ? (
                            <button className="w-full flex items-center justify-between px-3 py-2 text-slate-700 font-semibold hover:bg-brand-darkred/5 hover:text-brand-darkred rounded-none text-left text-[13px] transition duration-150">
                              {subTitle}
                              <ChevronRight size={13} className="text-slate-400 group-hover/sub:translate-x-0.5 transition-transform" />
                            </button>
                          ) : (
                            <Link
                              href={subTargetUrl}
                              target={subItem.open_in_new_tab ? "_blank" : undefined}
                              className="block px-3 py-2 text-slate-700 font-semibold hover:bg-brand-darkred/5 hover:text-brand-darkred rounded-none text-[13px] transition duration-150"
                            >
                              {subTitle}
                            </Link>
                          )}

                          {/* Submenu cấp 2 (nested dropdown) */}
                          {hasSubmenuLevel2 && (
                            <ul className="absolute left-[100%] top-0 hidden group-hover/sub:block bg-white shadow-md border border-slate-100 rounded-none py-2 min-w-[240px] z-50 ml-1.5 animate-in fade-in slide-in-from-left-1 duration-150">
                              {/* Cầu nối hover vô hình giúp di chuột từ menu cha sang con không bị mất */}
                              <div className="absolute top-0 -left-3 w-3 h-full bg-transparent pointer-events-auto" />
                              {subItem.children.filter(nested => nested.is_visible).map((nestedItem) => {
                                const nestedTargetUrl = resolveMenuUrl(nestedItem);
                                const nestedTitle = getLocalizedField<string>(nestedItem, "title", locale);
                                return (
                                  <li key={nestedItem.id} className="px-1 py-0.5">
                                    <Link
                                      href={nestedTargetUrl}
                                      target={nestedItem.open_in_new_tab ? "_blank" : undefined}
                                      className="block px-3 py-2 text-slate-700 font-semibold hover:bg-brand-darkred/5 hover:text-brand-darkred rounded-none text-[13px] transition duration-150"
                                    >
                                      {nestedTitle}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden text-slate-700 hover:text-brand-darkred focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="fixed inset-0 top-[108px] bg-white z-40 overflow-y-auto border-t border-slate-100 lg:hidden animate-in slide-in-from-right duration-250">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-darkred animate-ping"></span>
              <span className="text-sm font-semibold text-slate-800">
                {locale === "en" ? "COLLEGE OF ENGINEERING & TECHNOLOGY MENU" : "MENU TRƯỜNG KỸ THUẬT VÀ CÔNG NGHỆ"}
              </span>
            </div>
            <ul className="space-y-3">
              {menuItems.filter(item => item.is_visible).map((item) => {
                const hasSubmenu = item.children && item.children.length > 0;
                const targetUrl = resolveMenuUrl(item);
                const title = getLocalizedField<string>(item, "title", locale);

                return (
                  <li key={item.id} className="space-y-1">
                    {hasSubmenu ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.id)}
                          className="w-full flex items-center justify-between text-slate-800 font-semibold py-2 hover:text-brand-darkred text-left text-sm"
                        >
                          {title}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              activeDropdown === item.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {activeDropdown === item.id && (
                          <ul className="pl-4 space-y-2 mt-1 border-l border-slate-200 animate-in slide-in-from-top-1 duration-150">
                            {item.children.filter(sub => sub.is_visible).map((subItem) => {
                              const hasSubmenuLevel2 = subItem.children && subItem.children.length > 0;
                              const subTargetUrl = resolveMenuUrl(subItem);
                              const subTitle = getLocalizedField<string>(subItem, "title", locale);

                              return (
                                <li key={subItem.id} className="space-y-1">
                                  {hasSubmenuLevel2 ? (
                                    <div>
                                      <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider py-1 mt-2">
                                        {subTitle}
                                      </span>
                                      <ul className="pl-3 space-y-1">
                                        {subItem.children.filter(nested => nested.is_visible).map((nestedItem) => {
                                          const nestedTargetUrl = resolveMenuUrl(nestedItem);
                                          const nestedTitle = getLocalizedField<string>(nestedItem, "title", locale);
                                          return (
                                            <li key={nestedItem.id}>
                                              <Link
                                                href={nestedTargetUrl}
                                                target={nestedItem.open_in_new_tab ? "_blank" : undefined}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-slate-650 py-1.5 text-sm hover:text-brand-darkred"
                                              >
                                                {nestedTitle}
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  ) : (
                                    <Link
                                      href={subTargetUrl}
                                      target={subItem.open_in_new_tab ? "_blank" : undefined}
                                      onClick={() => setIsOpen(false)}
                                      className="block text-slate-700 py-1.5 text-sm hover:text-brand-darkred"
                                    >
                                      {subTitle}
                                    </Link>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={targetUrl}
                        target={item.open_in_new_tab ? "_blank" : undefined}
                        onClick={() => setIsOpen(false)}
                        className="block text-slate-800 font-semibold py-2 hover:text-brand-darkred text-sm"
                      >
                        {title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
