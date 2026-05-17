"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { faqs } from "@/data/moks"



export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2 text-sm tracking-wide uppercase">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground mt-4">
            Les réponses aux questions que les recruteurs et clients me posent le plus souvent.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-background overflow-hidden"
            >
              <button
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-secondary/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  className={`flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
