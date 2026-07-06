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
      <nav className="hidden items-center lg:flex" aria-label="Điều hướng chính">
        <ul className="flex items-center gap-1 xl:gap-2">
          {menuItems
            .filter((item) => item.is_visible)
            .map((item) => {
              const hasSubmenu = item.children && item.children.length > 0;
              const targetUrl = resolveMenuUrl(item);
              const title = getLocalizedField<string>(item, "title", locale);

              return (
                <li key={item.id} className="group relative">
                  {hasSubmenu ? (
                    item.has_link ? (
                      <Link
                        href={targetUrl as any}
                        target={item.open_in_new_tab ? "_blank" : undefined}
                        className="hover:bg-surface hover:text-brand-darkred flex min-h-11 items-center gap-1 rounded-md px-2.5 text-sm font-semibold text-slate-700 transition-colors duration-150 xl:px-3"
                      >
                        {title}
                        <ChevronDown
                          size={14}
                          className="group-hover:text-brand-darkred text-slate-400 transition-transform duration-150 group-hover:rotate-180"
                          aria-hidden="true"
                        />
                      </Link>
                    ) : (
                      <button className="hover:bg-surface hover:text-brand-darkred flex min-h-11 items-center gap-1 rounded-md px-2.5 text-sm font-semibold text-slate-700 transition-colors duration-150 xl:px-3">
                        {title}
                        <ChevronDown
                          size={14}
                          className="group-hover:text-brand-darkred text-slate-400 transition-transform duration-150 group-hover:rotate-180"
                          aria-hidden="true"
                        />
                      </button>
                    )
                  ) : (
                    <Link
                      href={targetUrl as any}
                      target={item.open_in_new_tab ? "_blank" : undefined}
                      className="hover:bg-surface hover:text-brand-darkred flex min-h-11 items-center rounded-md px-2.5 text-sm font-semibold text-slate-700 transition-colors duration-150 xl:px-3"
                    >
                      {title}
                    </Link>
                  )}

                  {/* Submenu cấp 1 */}
                  {hasSubmenu && (
                    <ul className="border-border animate-slide-down absolute top-full left-0 z-50 hidden min-w-60 rounded-lg border bg-white p-1.5 shadow-[var(--shadow-lg)] group-focus-within:block group-hover:block">
                      {item.children
                        .filter((sub) => sub.is_visible)
                        .map((subItem) => {
                          const hasSubmenuLevel2 = subItem.children && subItem.children.length > 0;
                          const subTargetUrl = resolveMenuUrl(subItem);
                          const subTitle = getLocalizedField<string>(subItem, "title", locale);

                          return (
                            <li key={subItem.id} className="group/sub relative px-1.5 py-0.5">
                              {hasSubmenuLevel2 ? (
                                subItem.has_link ? (
                                  <Link
                                    href={subTargetUrl as any}
                                    target={subItem.open_in_new_tab ? "_blank" : undefined}
                                    className="hover:bg-surface hover:text-brand-darkred flex min-h-11 w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-150"
                                  >
                                    {subTitle}
                                    <ChevronRight
                                      size={14}
                                      className="group-hover/sub:text-brand-darkred text-slate-400 transition-transform duration-150 group-hover/sub:translate-x-0.5"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                ) : (
                                  <button className="hover:bg-surface hover:text-brand-darkred flex min-h-11 w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-150">
                                    {subTitle}
                                    <ChevronRight
                                      size={14}
                                      className="group-hover/sub:text-brand-darkred text-slate-400 transition-transform duration-150 group-hover/sub:translate-x-0.5"
                                      aria-hidden="true"
                                    />
                                  </button>
                                )
                              ) : (
                                <Link
                                  href={subTargetUrl as any}
                                  target={subItem.open_in_new_tab ? "_blank" : undefined}
                                  className="hover:bg-surface hover:text-brand-darkred flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-150"
                                >
                                  {subTitle}
                                </Link>
                              )}

                              {/* Submenu cấp 2 (nested dropdown) */}
                              {hasSubmenuLevel2 && (
                                <ul className="border-border animate-fade-in absolute top-0 left-full z-50 ml-1.5 hidden min-w-60 rounded-lg border bg-white p-1.5 shadow-[var(--shadow-lg)] group-focus-within/sub:block group-hover/sub:block">
                                  {/* Cầu nối hover vô hình giúp di chuột từ menu cha sang con không bị mất */}
                                  <div className="pointer-events-auto absolute top-0 -left-3 h-full w-3 bg-transparent" />
                                  {subItem.children
                                    .filter((nested) => nested.is_visible)
                                    .map((nestedItem) => {
                                      const nestedTargetUrl = resolveMenuUrl(nestedItem);
                                      const nestedTitle = getLocalizedField<string>(
                                        nestedItem,
                                        "title",
                                        locale,
                                      );
                                      return (
                                        <li key={nestedItem.id} className="px-1.5 py-0.5">
                                          <Link
                                            href={nestedTargetUrl as any}
                                            target={
                                              nestedItem.open_in_new_tab ? "_blank" : undefined
                                            }
                                            className="hover:bg-surface hover:text-brand-darkred flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-150"
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
        className="hover:bg-surface hover:text-brand-darkred inline-flex size-11 items-center justify-center rounded-lg text-slate-700 transition-colors duration-150 lg:hidden"
        aria-label="Toggle Navigation Menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-border animate-fade-in absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-white shadow-[var(--shadow-lg)] lg:hidden"
        >
          <div className="site-container space-y-4 py-5">
            <div className="border-border border-b pb-3">
              <span className="text-sm font-semibold text-slate-700">
                {locale === "en"
                  ? "COLLEGE OF ENGINEERING & TECHNOLOGY MENU"
                  : "MENU TRƯỜNG KỸ THUẬT VÀ CÔNG NGHỆ"}
              </span>
            </div>
            <ul className="space-y-1">
              {menuItems
                .filter((item) => item.is_visible)
                .map((item) => {
                  const hasSubmenu = item.children && item.children.length > 0;
                  const targetUrl = resolveMenuUrl(item);
                  const title = getLocalizedField<string>(item, "title", locale);

                  return (
                    <li key={item.id} className="space-y-0.5">
                      {hasSubmenu ? (
                        <div>
                          <div className="hover:bg-surface flex w-full items-center justify-between rounded-lg">
                            {item.has_link ? (
                              <Link
                                href={targetUrl as any}
                                target={item.open_in_new_tab ? "_blank" : undefined}
                                onClick={() => setIsOpen(false)}
                                className="hover:text-brand-darkred flex min-h-11 flex-grow items-center px-3 text-left text-base font-semibold text-slate-700 transition-colors duration-150"
                              >
                                {title}
                              </Link>
                            ) : (
                              <button
                                onClick={() => handleDropdownToggle(item.id)}
                                className="min-h-11 flex-grow px-3 text-left text-base font-semibold text-slate-700 transition-colors duration-150"
                              >
                                {title}
                              </button>
                            )}
                            <button
                              onClick={() => handleDropdownToggle(item.id)}
                              className="hover:text-brand-darkred inline-flex size-11 items-center justify-center rounded-lg text-slate-500 transition-colors duration-150 hover:bg-white"
                              aria-label={`${activeDropdown === item.id ? "Thu gọn" : "Mở rộng"} ${title}`}
                              aria-expanded={activeDropdown === item.id}
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
                            <ul className="bg-surface animate-fade-up mt-1 ml-3 space-y-1 rounded-lg p-2">
                              {item.children
                                .filter((sub) => sub.is_visible)
                                .map((subItem) => {
                                  const hasSubmenuLevel2 =
                                    subItem.children && subItem.children.length > 0;
                                  const subTargetUrl = resolveMenuUrl(subItem);
                                  const subTitle = getLocalizedField<string>(
                                    subItem,
                                    "title",
                                    locale,
                                  );

                                  return (
                                    <li key={subItem.id} className="space-y-0.5">
                                      {hasSubmenuLevel2 ? (
                                        <div>
                                          {subItem.has_link ? (
                                            <Link
                                              href={subTargetUrl as any}
                                              target={
                                                subItem.open_in_new_tab ? "_blank" : undefined
                                              }
                                              onClick={() => setIsOpen(false)}
                                              className="hover:text-brand-darkred flex min-h-11 items-center px-2 text-sm font-semibold text-slate-600"
                                            >
                                              {subTitle}
                                            </Link>
                                          ) : (
                                            <span className="flex min-h-11 items-center px-2 text-sm font-semibold text-slate-600">
                                              {subTitle}
                                            </span>
                                          )}
                                          <ul className="space-y-0.5 pl-3">
                                            {subItem.children
                                              .filter((nested) => nested.is_visible)
                                              .map((nestedItem) => {
                                                const nestedTargetUrl = resolveMenuUrl(nestedItem);
                                                const nestedTitle = getLocalizedField<string>(
                                                  nestedItem,
                                                  "title",
                                                  locale,
                                                );
                                                return (
                                                  <li key={nestedItem.id}>
                                                    <Link
                                                      href={nestedTargetUrl as any}
                                                      target={
                                                        nestedItem.open_in_new_tab
                                                          ? "_blank"
                                                          : undefined
                                                      }
                                                      onClick={() => setIsOpen(false)}
                                                      className="hover:text-brand-darkred flex min-h-11 items-center rounded-md px-2 text-sm text-slate-600 transition-colors duration-150 hover:bg-white"
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
                                          className="hover:text-brand-darkred flex min-h-11 items-center rounded-md px-2 text-sm text-slate-700 transition-colors duration-150 hover:bg-white"
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
                          className="hover:bg-surface hover:text-brand-darkred flex min-h-11 items-center rounded-lg px-3 text-base font-semibold text-slate-700 transition-colors duration-150"
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
