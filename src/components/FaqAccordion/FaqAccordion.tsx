import { DottedDivider } from '../DottedDivider/DottedDivider';
import { IntroReveal } from '../IntroReveal/IntroReveal';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useId, useState } from 'react';
import type { FaqContentBlock } from '@constants/faqItems';
import type { FaqItemConfig } from '@constants/faqItems';
import { useTranslation } from '@i18n';

const BODY_CLASS = 'text-style-paragraph-3 leading-relaxed text-white';
const LIST_CLASS = 'list-disc space-y-2 pl-5';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

const PANEL_OPEN_TRANSITION = {
  height: { duration: 0.55, ease: EASE_OUT },
  opacity: { duration: 0.45, ease: EASE_OUT, delay: 0.05 },
};

const PANEL_CLOSE_TRANSITION = {
  height: { duration: 0.42, ease: EASE_IN_OUT },
  opacity: { duration: 0.22, ease: EASE_IN_OUT },
};

const ITEM_REVEAL_DURATION = 1.9;

type FaqAccordionToggleProps = {
  isOpen: boolean;
  prefersReducedMotion: boolean;
};

/**
 * Cursive − always sits underneath; + scales from its centre on top
 * so opening reveals the minus already in place.
 */
const FaqAccordionToggle = ({
  isOpen,
  prefersReducedMotion,
}: FaqAccordionToggleProps) => {
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : isOpen
      ? {
          // Hide: shrink to centre and fade out
          scale: { duration: 0.38, ease: EASE_OUT },
          opacity: { duration: 0.28, ease: EASE_OUT },
        }
      : {
          // Show: grow from centre (no fade — opposite of hide)
          scale: { duration: 0.45, ease: EASE_OUT },
          opacity: { duration: 0 },
        };

  return (
    <span
      className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center md:h-10 md:w-10"
      aria-hidden
    >
      <span className="text-style-cursive-title flex h-full w-full items-center justify-center leading-none text-cream">
        −
      </span>
      <motion.span
        className="text-style-cursive-title absolute inset-0 flex items-center justify-center leading-none text-cream"
        initial={false}
        animate={{
          scale: isOpen ? 0 : 1,
          opacity: isOpen ? 0 : 1,
        }}
        transition={transition}
        style={{ transformOrigin: 'center center' }}
      >
        +
      </motion.span>
    </span>
  );
};

type FaqAccordionProps = {
  items: FaqItemConfig[];
};

const FaqBody = ({ blocks }: { blocks: FaqContentBlock[] }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-2 md:pb-8 md:pt-3 md:px-11">
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return (
            <p key={`${block.key}-${index}`} className={BODY_CLASS}>
              {t(block.key)}
            </p>
          );
        }

        return (
          <ul key={`list-${index}`} className={LIST_CLASS}>
            {block.keys.map((key) => (
              <li key={key} className={BODY_CLASS}>
                {t(key)}
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
};

export const FaqAccordion = ({ items }: FaqAccordionProps) => {
  const baseId = useId();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const instant = { duration: 0 };

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <IntroReveal
            key={item.id}
            isInView
            staggerIndex={index}
            duration={ITEM_REVEAL_DURATION}
          >
            {index > 0 && <DottedDivider />}
            <h2 className="m-0">
              <button
                type="button"
                id={triggerId}
                className="flex w-full cursor-pointer items-center gap-4 py-5 text-left md:py-8"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className="flex min-w-0 flex-1 items-baseline gap-3 md:gap-4">
                  <span
                    className="text-style-cursive-title shrink-0 leading-none text-cream"
                    aria-hidden
                  >
                    {index + 1}.
                  </span>
                  <span className="text-header-2 text-off-white">
                    {t(item.questionKey)}
                  </span>
                </span>
                <FaqAccordionToggle
                  isOpen={isOpen}
                  prefersReducedMotion={!!prefersReducedMotion}
                />
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: prefersReducedMotion
                      ? instant
                      : PANEL_OPEN_TRANSITION,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: prefersReducedMotion
                      ? instant
                      : PANEL_CLOSE_TRANSITION,
                  }}
                  className="overflow-hidden"
                >
                  <FaqBody blocks={item.blocks} />
                </motion.div>
              )}
            </AnimatePresence>
          </IntroReveal>
        );
      })}
      <IntroReveal
        isInView
        staggerIndex={items.length}
        duration={ITEM_REVEAL_DURATION}
      >
        <DottedDivider />
      </IntroReveal>
    </div>
  );
};
