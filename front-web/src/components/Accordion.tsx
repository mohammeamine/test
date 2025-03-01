import { useState, ReactNode } from "react";

interface AccordionProps {
  children: ReactNode;
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return <div className="accordion">{children}</div>;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button
        className="accordion-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div className="accordion-panel">{children}</div>}
    </div>
  );
}