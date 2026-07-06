"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { MenuTreeResponse, MenuItemTreeNode, resolveMenuUrl } from "@/features/menu";
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
        <ul className="flex items-center gap-6 lg:gap-8">
          {menuItems.filter(item => item.is_visible).map((item) => {
            const hasSubmenu = item.children && item.children.length > 0;
            const targetUrl = resolveMenuUrl(item);
            const title = getLocalizedField<string>(item, "title", locale);

            return (
              <li key={item.id} className="relative group py-4">
                {hasSubmenu ? (
                  targetUrl !== "#" ? (
                    <Link
                      href={targetUrl as any}
                      target={item.open_in_new_tab ? "_blank" : undefined}
                      className="flex items-center gap-1 text-slate-600 font-medium hover:text-brand-darkred transition-colors duration-200 text-[13px] tracking-wide cursor-pointer"
                    >
                      {title}
                      <ChevronDown size={12} className="text-slate-400 group-hover:text-brand-darkred group-hover:rotate-180 transition-all duration-200" />
                    </Link>
                  ) : (
                    <button className="flex items-center gap-1 text-slate-600 font-medium hover:text-brand-darkred transition-colors duration-200 text-[13px] tracking-wide cursor-pointer">
                      {title}
                      <ChevronDown size={12} className="text-slate-400 group-hover:text-brand-darkred group-hover:rotate-180 transition-all duration-200" />
                    </button>
                  )
                ) : (
                  <Link
                    href={targetUrl as any}
                    target={item.open_in_new_tab ? "_blank" : undefined}
                    className="text-slate-600 font-medium hover:text-brand-darkred transition-colors duration-200 text-[13px] tracking-wide"
                  >
                    {title}
                  </Link>
                )}

                {/* Submenu cấp 1 */}
                {hasSubmenu && (
                  <ul className="absolute left-0 top-[100%] hidden group-hover:block bg-white  border border-border/40 rounded-sm py-1.5 min-w-[240px] z-50 animate-slide-down">
                    {item.children.filter(sub => sub.is_visible).map((subItem) => {
                      const hasSubmenuLevel2 = subItem.children && subItem.children.length > 0;
                      const subTargetUrl = resolveMenuUrl(subItem);
                      const subTitle = getLocalizedField<string>(subItem, "title", locale);

                      return (
                        <li key={subItem.id} className="relative group/sub px-1.5 py-0.5">
                          {hasSubmenuLevel2 ? (
                            subTargetUrl !== "#" ? (
                              <Link
                                href={subTargetUrl as any}
                                target={subItem.open_in_new_tab ? "_blank" : undefined}
                                className="w-full flex items-center justify-between px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 hover:text-brand-darkred rounded-sm text-left text-[13px] transition-all duration-150"
                              >
                                {subTitle}
                                <ChevronRight size={12} className="text-slate-300 group-hover/sub:text-brand-darkred group-hover/sub:translate-x-0.5 transition-all duration-150" />
                              </Link>
                            ) : (
                              <button className="w-full flex items-center justify-between px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 hover:text-brand-darkred rounded-sm text-left text-[13px] transition-all duration-150">
                                {subTitle}
                                <ChevronRight size={12} className="text-slate-300 group-hover/sub:text-brand-darkred group-hover/sub:translate-x-0.5 transition-all duration-150" />
                              </button>
                            )
                          ) : (
                            <Link
                              href={subTargetUrl as any}
                              target={subItem.open_in_new_tab ? "_blank" : undefined}
                              className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 hover:text-brand-darkred rounded-sm text-[13px] transition-all duration-150"
                            >
                              {subTitle}
                            </Link>
                          )}

                          {/* Submenu cấp 2 (nested dropdown) */}
                          {hasSubmenuLevel2 && (
                            <ul className="absolute left-[100%] top-0 hidden group-hover/sub:block bg-white  border border-border/40 rounded-sm py-1.5 min-w-[240px] z-50 ml-1.5 animate-fade-in">
                              {/* Cầu nối hover vô hình giúp di chuột từ menu cha sang con không bị mất */}
                              <div className="absolute top-0 -left-3 w-3 h-full bg-transparent pointer-events-auto" />
                              {subItem.children.filter(nested => nested.is_visible).map((nestedItem) => {
                                const nestedTargetUrl = resolveMenuUrl(nestedItem);
                                const nestedTitle = getLocalizedField<string>(nestedItem, "title", locale);
                                return (
                                  <li key={nestedItem.id} className="px-1.5 py-0.5">
                                    <Link
                                      href={nestedTargetUrl as any}
                                      target={nestedItem.open_in_new_tab ? "_blank" : undefined}
                                      className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 hover:text-brand-darkred rounded-sm text-[13px] transition-all duration-150"
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
        className="lg:hidden text-slate-600 hover:text-brand-darkred focus:outline-none transition-colors duration-200"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="fixed inset-0 top-[108px] bg-white z-40 overflow-y-auto border-t border-border/50 lg:hidden animate-fade-in">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-4 border-b border-border/50">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-darkred animate-ping"></span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                {locale === "en" ? "COLLEGE OF ENGINEERING & TECHNOLOGY MENU" : "MENU TRƯỜNG KỸ THUẬT VÀ CÔNG NGHỆ"}
              </span>
            </div>
            <ul className="space-y-1">
              {menuItems.filter(item => item.is_visible).map((item) => {
                const hasSubmenu = item.children && item.children.length > 0;
                const targetUrl = resolveMenuUrl(item);
                const title = getLocalizedField<string>(item, "title", locale);

                return (
                  <li key={item.id} className="space-y-0.5">
                    {hasSubmenu ? (
                      <div>
                        <div className="w-full flex items-center justify-between hover:bg-slate-50 rounded-sm">
                          {targetUrl !== "#" ? (
                            <Link
                              href={targetUrl as any}
                              target={item.open_in_new_tab ? "_blank" : undefined}
                              onClick={() => setIsOpen(false)}
                              className="flex-grow text-slate-700 font-medium py-2.5 px-2 hover:text-brand-darkred text-left text-sm transition-all duration-200 cursor-pointer"
                            >
                              {title}
                            </Link>
                          ) : (
                            <button
                              onClick={() => handleDropdownToggle(item.id)}
                              className="flex-grow text-slate-700 font-medium py-2.5 px-2 text-left text-sm transition-all duration-200 cursor-pointer focus:outline-none"
                            >
                              {title}
                            </button>
                          )}
                          <button
                            onClick={() => handleDropdownToggle(item.id)}
                            className="p-2.5 text-slate-400 hover:text-brand-darkred focus:outline-none transition-all duration-200 cursor-pointer"
                          >
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-200 ${
                                activeDropdown === item.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>
                        {activeDropdown === item.id && (
                          <ul className="pl-4 space-y-0.5 mt-0.5 border-l-2 border-brand-darkred/10 ml-2 animate-fade-up">
                            {item.children.filter(sub => sub.is_visible).map((subItem) => {
                              const hasSubmenuLevel2 = subItem.children && subItem.children.length > 0;
                              const subTargetUrl = resolveMenuUrl(subItem);
                              const subTitle = getLocalizedField<string>(subItem, "title", locale);

                              return (
                                <li key={subItem.id} className="space-y-0.5">
                                  {hasSubmenuLevel2 ? (
                                    <div>
                                      {subTargetUrl !== "#" ? (
                                        <Link
                                          href={subTargetUrl as any}
                                          target={subItem.open_in_new_tab ? "_blank" : undefined}
                                          onClick={() => setIsOpen(false)}
                                          className="block text-[10px] font-semibold text-slate-400 hover:text-brand-darkred uppercase tracking-widest py-1.5 mt-2 px-2 cursor-pointer"
                                        >
                                          {subTitle}
                                        </Link>
                                      ) : (
                                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest py-1.5 mt-2 px-2">
                                          {subTitle}
                                        </span>
                                      )}
                                      <ul className="pl-3 space-y-0.5">
                                        {subItem.children.filter(nested => nested.is_visible).map((nestedItem) => {
                                          const nestedTargetUrl = resolveMenuUrl(nestedItem);
                                          const nestedTitle = getLocalizedField<string>(nestedItem, "title", locale);
                                          return (
                                            <li key={nestedItem.id}>
                                              <Link
                                                href={nestedTargetUrl as any}
                                                target={nestedItem.open_in_new_tab ? "_blank" : undefined}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-slate-500 py-2 px-2 text-sm hover:text-brand-darkred hover:bg-slate-50 rounded-sm transition-all duration-150"
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
                                      href={subTargetUrl as any}
                                      target={subItem.open_in_new_tab ? "_blank" : undefined}
                                      onClick={() => setIsOpen(false)}
                                      className="block text-slate-600 py-2 px-2 text-sm hover:text-brand-darkred hover:bg-slate-50 rounded-sm transition-all duration-150"
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
                        href={targetUrl as any}
                        target={item.open_in_new_tab ? "_blank" : undefined}
                        onClick={() => setIsOpen(false)}
                        className="block text-slate-700 font-medium py-2.5 px-2 hover:text-brand-darkred hover:bg-slate-50 rounded-sm text-sm transition-all duration-200"
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
