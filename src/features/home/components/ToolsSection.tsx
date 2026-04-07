"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Tool {
  title: string;
  description: string;
  href: string;
  dev?: boolean;
  optional?: boolean;
}

interface FlowStep {
  title: string;
  description: string;
  href: string;
  optional?: boolean;
  parallel?: boolean;
}

interface Props {
  title: string;
  tools?: Tool[];
  variant?: "grid" | "flow";
  flowSteps?: FlowStep[];
}

// Container Animation
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
      delayChildren: 0.7,
    },
  },
};

// Card Item Animation
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

function GridSection({ title, tools }: { title: string; tools: Tool[] }) {
  return (
    <motion.div
      className="mb-20"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h3 className="text-lg font-semibold mb-2" variants={itemVariants}>
        {title}
      </motion.h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {tools.map((tool) => (
          <motion.div key={tool.href} variants={itemVariants}>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{tool.title}</h2>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {tool.description}
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full hover:text-white"
                >
                  <Link href={tool.href}>
                    Go to <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FlowSection({ title, flowSteps }: { title: string; flowSteps: FlowStep[] }) {
  return (
    <motion.div
      className="mb-20"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h3 className="text-lg font-semibold mb-4" variants={itemVariants}>
        {title}
      </motion.h3>

      {/* Vertical flow — all screen sizes */}
      <div className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
        {flowSteps.map((step, index) => (
          <div key={step.href} className="flex flex-col items-center gap-3">
            <motion.div variants={itemVariants} className="w-full">
              <Card className={step.optional ? "border-dashed border-muted-foreground/40" : ""}>
                <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        Step {index + 1}
                      </span>
                      {step.optional && (
                        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                          Optional
                        </span>
                      )}
                      {step.parallel && (
                        <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                          Parallel
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-bold leading-snug">{step.title}</h2>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>
                  <Button asChild variant="outline" className="sm:w-28 hover:text-white flex-shrink-0">
                    <Link href={step.href}>
                      Start <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {index < flowSteps.length - 1 && (
              <motion.div variants={itemVariants} className="text-muted-foreground/40">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ToolsSection({ title, tools = [], variant = "grid", flowSteps = [] }: Props) {
  if (variant === "flow") {
    return <FlowSection title={title} flowSteps={flowSteps} />;
  }

  return <GridSection title={title} tools={tools} />;
}
