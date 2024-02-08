import { AI_STYLES } from "@/config/styles";
import { motion, Variants } from "framer-motion";

const ParentVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const CardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

interface ChooseArtStyleProps {
  setSelectedStyle: React.Dispatch<React.SetStateAction<string | null>>;
}
export const ChooseArtStyle = ({ setSelectedStyle }: ChooseArtStyleProps) => {
  return (
    <>
      <motion.div
        animate={"visible"}
        initial={"hidden"}
        variants={ParentVariant}
        className="w-full mt-7 gap-5 grid grid-cols-3"
      >
        {Object.keys(AI_STYLES).map((style, i) => (
          <motion.div
            onClick={() => setSelectedStyle(style)}
            variants={CardVariants}
            key={i}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-40 h-40 border-4 border-transparent rounded-lg overflow-hidden group-hover:border-primary  transition-all ">
              <img
                className="w-full h-full object-cover"
                src={AI_STYLES[style].cover}
                alt=""
              />
            </div>
            <div className="mt-2 font-medium">
              <h1 className="text-xl">{AI_STYLES[style].title}</h1>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};
