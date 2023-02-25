import { z } from "zod";

export const dictWordSchema = z.object({
  word_uuid: z.string(),
  surface: z.string(),
  pronunciation: z.string(),
  accent_type: z.number(),
  word_type: z
    .enum(["PROPER_NOUN", "COMMON_NOUN", "VERB", "ADJECTIVE", "SUFFIX", ""])
    .or(z.null())
    .transform((v) => (v === "" ? null : v)),
  priority: z.number(),
});

export const dictWordToList = (word: DictWord) => {
  return [
    word.word_uuid,
    word.surface,
    word.pronunciation,
    word.accent_type,
    word.word_type,
    word.priority,
  ];
};

export const dictWordFromList = (list: string[]) => {
  return dictWordSchema.parse({
    word_uuid: list[0],
    surface: list[1],
    pronunciation: list[2],
    accent_type: parseInt(list[3]),
    word_type: list[4] as unknown as DictWord["word_type"],
    priority: parseInt(list[5]),
  });
};

export type DictWord = z.infer<typeof dictWordSchema>;

export const requestType = {
  apply_word: dictWordSchema,
  rewrite_word: dictWordSchema,
  delete_word: z.object({
    word_uuid: z.string(),
  }),
};

export const requestSchema = z.union(
  // @ts-expect-error 謎のエラー
  Object.entries(requestType).map(([key, value]) => {
    return z.object({
      event: z.literal(key),
      properties: value,
    });
  })
);
