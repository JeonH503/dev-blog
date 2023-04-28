export type UID = string;
export type BlockObject = 'block';
export type BlockType = "bookmark"
| "breadcrumb"
| "bulleted_list_item"
| "callout"
| "child_database"
| "child_page"
| "column"
| "column_list"
| "code"
| "divider"
| "embed"
| "equation"
| "file"
| "heading_1"
| "heading_2"
| "heading_3"
| "image"
| "link_preview"
| "link_to_page"
| "numbered_list_item"
| "paragraph"
| "pdf"
| "quote"
| "synced_block"
| "table"
| "table_of_contents"
| "table_row"
| "template"
| "to_do"
| "toggle"
| "unsupported"
| "video";
export type RichTextType = "text" | "mention" | "equation";
export type Color = "blue"
| "blue_background"
| "brown"
| "brown_background"
| "default"
| "gray"
| "gray_background"
| "green"
| "green_background"
| "orange"
| "orange_background"
| "pink"
| "pink_background"
| "purple"
| "purple_background"
| "red"
| "red_background"
| "yellow"
| "yellow_background";

export type RichText = TextRichText | EquationRichText | MentionRichText;

export type Block = Bookmark 
| Breadcrumb 
| BulletedListItem
| Callout
| ChildDatabase
| ChildPage
| Code
| ColumnList
| Column
| Divider
| Embed
| Equation
| FileBlock
| Head1
| Head2
| Head3
| Image
| LinkPreview
| NumberedListItem
| Paragraph
| PDF
| Quote
| SyncedBlock
| Table
| TableRows
| TableOfContents
| ToDo
| ToggleBlocks
| Video;

export type Language = "abap"
| "arduino"
| "bash"
| "basic"
| "c"
| "clojure"
| "coffeescript"
| "c++"
| "c#"
| "css"
| "dart"
| "diff"
| "docker"
| "elixir"
| "elm"
| "erlang"
| "flow"
| "fortran"
| "f#"
| "gherkin"
| "glsl"
| "go"
| "graphql"
| "groovy"
| "haskell"
| "html"
| "java"
| "javascript"
| "json"
| "julia"
| "kotlin"
| "latex"
| "less"
| "lisp"
| "livescript"
| "lua"
| "makefile"
| "markdown"
| "markup"
| "matlab"
| "mermaid"
| "nix"
| "objective-c"
| "ocaml"
| "pascal"
| "perl"
| "php"
| "plain text"
| "powershell"
| "prolog"
| "protobuf"
| "python"
| "r"
| "reason"
| "ruby"
| "rust"
| "sass"
| "scala"
| "scheme"
| "scss"
| "shell"
| "sql"
| "swift"
| "typescript"
| "vb.net"
| "verilog"
| "vhdl"
| "visual basic"
| "webassembly"
| "xml"
| "yaml"
| "java/c/c++/c#";

export type EmojiTypes = Emoji | File | FileExternal;

export type VideoTypes = File | FileExternal;

export interface Emoji {
  type:"emoji";
  emoji:string;
}
export interface File {
  type:"file",
  caption:RichText[] | [];
  file:{
    url:string;
    expiry_time:string;
  }
}
export interface FileExternal {
  type:"external",
  caption:RichText[] | [];
  external:{
    url:string;
  }
}

export interface DatabaseParent {
  type:"database_id";
  database_id:string;
}
export interface PageParent {
  type:"page_id";
  page_id:string;
}
export interface WorkspaceParent {
  type:"workspace_id";
  workspace_id:string;
}
export interface BlockParent {
  type:"block_id";
  block_id:string;
}
export interface CreatedBy {
  object: string;
  id: string;
}

export interface BaseRichText {
  type:RichTextType;
  annotations:Annotations;
  plain_text:string;
  href?:string;
}
export interface Annotations {
  bold:boolean;
  italic:boolean;
  strikethrough:boolean;
  underline:boolean;
  code:boolean;
  color:Color;
}
export interface TextRichText extends BaseRichText {
  type:"text";
  text:{
    content:string;
    link: null | {url:string};
  }
}
export interface MentionRichText extends BaseRichText {
  type:"mention";
  mention:{
    type:"database";
    database: {id:string};
  } | {
    type:"date";
    date : {start:string; end:string;};
  } | {
    type:"link_preview";
    link_preview :{url:string};
  } | {
    type:"page"
    page : {id:string};
  } | {
    type:"template_mention"
    template_mention : {type:string; template_mention_date:string;}
  } | {
    type:"user"
    user : {object:string; id:string};
  }
}
export interface EquationRichText extends BaseRichText {
  type:"equation";
  equation : {
    expression:string;
  } 
}

export type BaseBlock = {
  object : BlockObject;
  id: UID;
  parent: DatabaseParent | PageParent | WorkspaceParent | BlockParent
  type:BlockType;
  created_time:string;
  created_by:CreatedBy;
  last_edited_time:string;
  last_edited_by?:CreatedBy;
  archived:boolean;
  has_children:boolean;
  
  // bookmark?:any;
  // breadcrumb?:any;
  // bulleted_list_item?:any;
  // callout?:any;
  // child_database?:any;
  // child_page?:any;
  // column?:any;
  // column_list?:any;
  // code?:any;
  // divider?:any;
  // embed?:any;
  // equation?:any;
  // file?:any;
  // heading_1?:any;
  // heading_2?:any;
  // heading_3?:any;
  // image?:any;
  // link_preview?:any;
  // link_to_page?:any;
  // numbered_list_item?:any;
  // paragraph?:any;
  // pdf?:any;
  // quote?:any;
  // synced_block?:any;
  // table?:any;
  // table_of_contents?:any;
  // table_row?:any;
  // template?:any;
  // to_do?:any;
  // toggle?:any;
  // unsupported?:any;
  // video?:any;
}

export interface Bookmark extends BaseBlock {
  type:"bookmark";
  bookmark : {
    caption : RichText[];
    url:string;
  }
}

export interface Breadcrumb extends BaseBlock {
  type:'breadcrumb',
  breadcrumb:{};
}

export interface BulletedListItem extends BaseBlock {
  type:"bulleted_list_item";
  bulleted_list_item:{
    rich_text : RichText[];
    color : Color;
    children? : Block[];
  }
}

export interface Callout extends BaseBlock {
  type:"callout";
  callout:{
    rich_text : RichText[];
    icon : Emoji | File | FileExternal;
    color : Color;
  }
}

export interface ChildDatabase extends BaseBlock {
  type:"child_database";
  child_database:{
    title:string;
  }
}

export interface ChildPage extends BaseBlock {
  type:"child_page";
  child_page:{
    title:"string";
  }
}

export interface Code extends BaseBlock {
  type:"code";
  code:{
    caption:RichText[];
    rich_text:RichText[];
    type:"text",
    text:{
      content:string;
    }
    language:Language;
  }
}

export interface ColumnList extends BaseBlock {
  type:"column_list";
  column_list:{};
}

export interface Column extends BaseBlock {
  type:"column";
  column:{};
}

export interface Divider extends BaseBlock {
  type:"divider";
  divider:{};
}

export interface Embed extends BaseBlock {
  type:"embed";
  embed:{
    url:string;
  };
}

export interface Equation extends BaseBlock {
  type:"equation";
  equation:{
    expression:string;
  };
}

export interface FileBlock extends BaseBlock {
  type:"file";
  file:File | FileExternal;
}

export interface Head1 extends BaseBlock {
  type: "heading_1";
  heading_1:{
    rich_text:RichText[];
    color:Color;
    is_toggleable:boolean;
  }
}
export interface Head2 extends BaseBlock {
  type: "heading_2";
  heading_2:{
    rich_text:RichText[];
    color:Color;
    is_toggleable:boolean;
  }
}
export interface Head3 extends BaseBlock {
  type: "heading_3";
  heading_3:{
    rich_text:RichText[];
    color:Color;
    is_toggleable:boolean;
  }
}

export interface Image extends BaseBlock {
  type:"image";
  image:File | FileExternal;
}

export interface LinkPreview extends BaseBlock {
  type:"link_preview";
  link_preview:{
    url:string;
  }
}

export interface NumberedListItem extends BaseBlock {
  type:"numbered_list_item";
  numbered_list_item:{
    rich_text:RichText[];
    color:Color;
  }
}

export interface Paragraph extends BaseBlock {
  type:"paragraph";
  paragraph:{
    rich_text:RichText[];
    color:Color;
  }
}

export interface PDF extends BaseBlock {
  type:"pdf";
  pdf:FileExternal | File;
}

export interface Quote extends BaseBlock {
  type:"quote";
  quote:{
    rich_text:RichText[];
    color:Color;
  }
}

export interface SyncedBlock extends BaseBlock {
  type:"synced_block";
  synced_block:{
    synced_from:null | {
      block_id:string;
    };
    children?:Block[]
  }
}

export interface Table extends BaseBlock {
  type:"table";
  table:TableData
}

export interface TableData {
  table_width:number;
  has_column_header:boolean;
  has_row_header:boolean;
}

export interface TableRows extends BaseBlock {
  type:"table_row";
  table_row:TableRow
}

export interface TableRow {
  cells:RichText[][];
}

export interface TableOfContents extends BaseBlock {
  type: "table_of_contents",
  table_of_contents: {
    color: Color
  }
}

export interface ToDo extends BaseBlock {
  type:"to_do";
  to_do:{
    rich_text:RichText[];
    checked:boolean;
    color:Color;
    children?:Block[];
  }
}

export interface ToggleBlocks extends BaseBlock {
  type:"toggle";
  toggle:{
    rich_text:RichText[];
    color:Color;
    children?:Block[];
  }
}

export interface Video extends BaseBlock {
  type:"video";
  video:VideoTypes;
}



export interface FirstBlock {
  object:string;
  results:unknown;
  next_cursor:null|string;
  has_more:boolean;
  type:string;
  block:{};
  developer_survey:string;
} 