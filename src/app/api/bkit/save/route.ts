import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

type BkitDocType = "prd" | "trd" | "ia" | "usecases" | "design";

const DOC_TYPE_CONFIG: Record<BkitDocType, { dir: string; suffix: string }> = {
  prd:      { dir: "docs/00-pm",                suffix: "prd"     },
  trd:      { dir: "docs/02-design/features",   suffix: "trd"     },
  ia:       { dir: "docs/02-design/features",   suffix: "ia"      },
  usecases: { dir: "docs/02-design/features",   suffix: "usecase" },
  design:   { dir: "docs/02-design/features",   suffix: "design"  },
};

export async function POST(request: NextRequest) {
  try {
    const { content, docType, featureName } = await request.json();

    if (!content || !docType || !featureName) {
      return NextResponse.json(
        { error: "Missing required fields: content, docType, featureName" },
        { status: 400 }
      );
    }

    const config = DOC_TYPE_CONFIG[docType as BkitDocType];
    if (!config) {
      return NextResponse.json(
        { error: `Invalid docType: ${docType}. Must be one of: prd, trd, ia, usecases, design` },
        { status: 400 }
      );
    }

    const basePath = process.cwd();
    const dirPath = join(basePath, config.dir);
    const fileName = `${featureName}.${config.suffix}.md`;
    const filePath = join(dirPath, fileName);
    const relativePath = `${config.dir}/${fileName}`;

    mkdirSync(dirPath, { recursive: true });
    writeFileSync(filePath, content, "utf-8");

    return NextResponse.json({ success: true, path: relativePath });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
