export type Style = {
  title: string;
  prompt: string;
  cover?: string;
  examples: string[];
};
export const AI_STYLES: Record<string, Style> = {
  howls: {
    title: "HOWLS Album Art Style",
    cover: "/art_styles/howls.png",
    prompt: `In a realistic depiction, visualize a scene that deeply embodies the emotional essence of the line [line_here]. set in the ancient castle of the Moroccan desert. The main character is a human thematically aligned with a wolf and is dressed in rugged and weathered clothing, featuring a distinct emblem or sign that signifies their connection to wolves. This emblem should be intricately designed and incorporated into the character's attire, perhaps as an emblem on a cloak, pendant, or armor.
    The main character should exude a determined and fierce demeanor, with a rugged appearance that reflects the harsh desert environment focusing on conveying a deep emotional connection to the line.
    The antagonists are inspired by the silhouette of figures in the provided image, draped in dark, flowing cloaks that obscure their forms.     
    The scene should represent the meaning of the given line, for example if the its about fighting for love it should be scene where the main character is fighting the cloaks to reach the caged heart, etc. the scene should be rounded by the vast Moroccan desert landscape.
    The contrast between the lone wolf-themed hero and the group of dark cloaked villains creates a dramatic and intense atmosphere, typical of an epic showdown in the Moroccan desert castle.`,
    examples: [],
  },
  minimal_world: {
    title: "Minimal Dream World",
    prompt: `Visualize a scene that deeply embodies the emotional essence of the line [line_here]. The setting is an abstract, black and white world with swirling patterns, set in a minimalist grid environment with tactile landscapes. The surreal human figures within this space are more prominently expressing longing and searching, with gestures and postures that suggest a profound sense of loss and yearning. They are subtly blended into the environment, maintaining a minimalist aesthetic, but their emotions are more vividly portrayed. The atmosphere is further enhanced with realistic water drops, symbolizing the emotional intensity. The entire composition is rendered in a style akin to cinema4D, with minimal retouching for a raw and authentic feel, focusing on conveying a deep emotional connection to the line`,
    examples: [],
    cover: "/art_styles/minimal.png",
  },
  red_anime: {
    title: "Anime",
    cover: "/art_styles/anime.png",
    prompt: `Picture a digital illustration where a character is caught in the midst of an action that reflects the emotional weight of the lyrics [line_here]. Set against a stark, vibrant red backdrop, the character stands out with sharp, evocative eyes that glimmer with an internal fire. Regardless of gender, the character's hair is a deep, lustrous black, styled to combine edgy modernity with timeless grace. They are attired in dark, fashion-forward clothing that brings a contemporary edge to the scene. The character is interacting with their environment, which is alive with movement and filled with symbolic elements that echo the narrative thrust of the lyrics. This interaction is purposeful and charged with meaning, contributing to the overall storytelling. Their posture and demeanor radiate confidence and mystery, suggesting they are at a pivotal point of action or decision that resonates deeply with the [line_here]. The composition of the illustration is dynamic and engaging, with every element—from the character's pose to the backdrop—harmoniously intertwined to underscore the emotional tone of the lyrics, crafting an impactful and unified visual narrative.`,
    examples: [],
  },
};
