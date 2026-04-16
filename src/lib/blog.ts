export const BLOG_TOPIC_VALUES = [
  "study",
  "development",
  "retrospective",
  "projects",
  "thoughts",
] as const;

export type BlogTopic = (typeof BLOG_TOPIC_VALUES)[number];

export const BLOG_TOPIC_LABELS: Record<BlogTopic, string> = {
  study: "Study",
  development: "Development",
  retrospective: "Retrospective",
  projects: "Projects",
  thoughts: "Thoughts",
};

export const BLOG_TOPIC_DESCRIPTIONS: Record<
  BlogTopic,
  { ko: string; en: string }
> = {
  study: {
    ko: "AI, OS, 네트워크, 딥러닝 같은 공부 노트",
    en: "Notes on AI, systems, networking, and deep learning",
  },
  development: {
    ko: "블로그와 제품을 만들며 남긴 구현 기록",
    en: "Build logs and implementation notes from making things",
  },
  retrospective: {
    ko: "작업을 마친 뒤 돌아본 회고와 정리",
    en: "Reflections and postmortems after the work",
  },
  projects: {
    ko: "프로젝트 중심으로 묶은 기록과 진행 로그",
    en: "Project-focused writeups and progress logs",
  },
  thoughts: {
    ko: "방향, 기록 습관, 배운 점에 대한 생각들",
    en: "Thoughts on direction, process, and what I am learning",
  },
};

export function getBlogTopicLabel(topic: BlogTopic): string {
  return BLOG_TOPIC_LABELS[topic];
}

export function getBlogTopicDescription(
  topic: BlogTopic,
  locale: "ko" | "en" = "ko",
): string {
  return BLOG_TOPIC_DESCRIPTIONS[topic][locale];
}
