export interface Condition {
  id: string;
  title: string;
}

const text = {
  " Have you ever...": {
    "… asked your boss for a pay rise?": {
      Sergio: "no",
      Marie: "yes",
      Lucy: "yes",
    },
    "… led a formal meeting?": { Sergio: "yes", Marie: "no", Lucy: "no" },
    "… negotiated a very valuable contract?": {
      Sergio: "no",
      Marie: "yes",
      Lucy: "no",
    },
  },
};
