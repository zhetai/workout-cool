"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";

import { useI18n } from "locales/client";
import { cn } from "@/shared/lib/utils";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({ data, className, questionClassName, answerClassName }: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const t = useI18n();

  return (
    <div className={cn("", className)}>
      <div className="text-muted-foreground mb-4 text-sm">{t("commons.received_just_now")}</div>

      <Accordion.Root collapsible onValueChange={(value) => setOpenItem(value)} type="single" value={openItem || ""}>
        {data.map((item) => {
          const cleanAnswerHTML = DOMPurify.sanitize(item.answer);

          return (
            <Accordion.Item className="mb-2" key={item.id} value={item.id.toString()}>
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4">
                  <div
                    className={cn(
                      "relative flex items-center space-x-2 rounded-xl p-2 transition-colors",
                      openItem === item.id.toString() ? "bg-primary/20 text-primary" : "bg-muted hover:bg-primary/10",
                      questionClassName,
                    )}
                  >
                    {item.icon && (
                      <span
                        className={cn("absolute bottom-6", item.iconPosition === "right" ? "right-0" : "left-0")}
                        style={{
                          transform: item.iconPosition === "right" ? "rotate(7deg)" : "rotate(-4deg)",
                        }}
                      >
                        {item.icon}
                      </span>
                    )}
                    <span className="font-medium">{item.question}</span>
                  </div>

                  <span className={cn("text-muted-foreground", openItem === item.id.toString() && "text-primary")}>
                    {openItem === item.id.toString() ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content asChild forceMount>
                <motion.div
                  animate={openItem === item.id.toString() ? "open" : "collapsed"}
                  className="overflow-hidden"
                  initial="collapsed"
                  transition={{ duration: 0.4 }}
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                >
                  <div className="ml-7 mt-1 flex justify-end md:ml-16">
                    <div
                      className={cn("text-primary-foreground relative max-w-md rounded-2xl bg-primary px-4 py-2", answerClassName)}
                      dangerouslySetInnerHTML={{ __html: cleanAnswerHTML }}
                    />
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
