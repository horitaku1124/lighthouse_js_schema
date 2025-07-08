// 個々の監査（Audit）項目の詳細情報を表現するインターフェース群
interface TableDetails {
  type: 'table';
  headings: {
    key: string;
    valueType: string;
    label: string;
  }[];
  items: any[]; // itemの具体的な型が不明なためany[]としますが、必要に応じてより具体的に定義してください
}

interface DebugDataDetails {
  type: 'debugdata';
  viewportContent?: string; // screenshot-thumbnailsなど、他のtypeでは存在しない可能性があるためオプショナル
}

interface FilmstripDetails {
  type: 'filmstrip';
  scale: number;
  items: {
    timing: number;
    timestamp: number;
    data: string; // Base64エンコードされた画像データ
  }[];
}

// 監査（Audit）項目のインターフェース
interface Audit {
  id: string;
  title: string;
  description: string;
  score: number | null; // scoreはnullの場合もある
  scoreDisplayMode: string;
  numericValue?: number; // オプショナルなプロパティ
  numericUnit?: string;  // オプショナルなプロパティ
  displayValue?: string; // オプショナルなプロパティ
  scoringOptions?: {
    p10: number;
    median: number;
  };
  details?: TableDetails | DebugDataDetails | FilmstripDetails; // 詳細情報は複数の型を取りうる
  warnings?: any[]; // オプショナルなプロパティ
  metricSavings?: {
    [key: string]: number;
  };
  guidanceLevel?: number; // オプショナルなプロパティ
}

// レポート全体のルートとなるインターフェース
interface LighthouseReport {
  lighthouseVersion: string;
  requestedUrl: string;
  mainDocumentUrl: string;
  finalDisplayedUrl: string;
  finalUrl: string;
  fetchTime: string; // ISO 8601形式の文字列
  gatherMode: string;
  runWarnings: any[]; // 具体的な型が不明なためany[]とします
  userAgent: string;
  environment: {
    networkUserAgent: string;
    hostUserAgent: string;
    benchmarkIndex: number;
    credits: {
      [key: string]: string; // "axe-core"のようなキーとバージョンのペア
    };
  };
  audits: {
    [auditId: string]: Audit; // "is-on-https" のような動的なキーに対応
  };
}

