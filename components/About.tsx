'use client'

import Highlight from "./Highlight";
import { CONFIG } from "@/lib";
import { motion } from "framer-motion";
import { FC } from "react";

export const About: FC = () => {
	return (
		<div className="w-full mx-auto flex flex-col md:flex-row text-center md:text-left" id="about">
			<div className="w-full md:w-1/2 pr-10 pt-28 flex flex-col">
				<p className="text-md tracking-tightest font-bold">
					<Highlight>Being a&nbsp;{CONFIG.TITLE}...</Highlight>
				</p>
				<h1 className="text-5xl tracking-[-5px] text-white">
					Who am I <Highlight>&amp;</Highlight> how did I get here?
				</h1>
				<div className="mt-4">
					<p className="text-white text-md">
						Hello there! I'm a full-stack developer with a passion for building <Highlight>software</Highlight> and web
						applications. With a background in Typescript, Java, and C#, I'm currently learning C and C++.
						<br />
						<br />I like to build <Highlight>full-stack applications</Highlight> with scalable and responsive technologies. I'm also a
						fan of the <Highlight>open-source community</Highlight> and I'm always looking for new ways to improve my skills.
					</p>
				</div>
			</div>
			<h1 className="pt-20 text-3xl font-semibold md:hidden">Language Skill</h1>
			<div className="flex flex-col items-center justify-center md:mx-auto pt-10 md:pt-0">
				{codeData.map((code, index) => (
					<CodeComponent key={index} {...code} />
				))}
			</div>
		</div>
	);
};

type ICodeComponent = {
	lang: string;
	level: "w-full" | "w-2/3" | "w-1/3";
	logo: string;
};

const codeData: ICodeComponent[] = [
	{ lang: "typescript", level: "w-full", logo: "typescript" },
	{ lang: "java", level: "w-2/3", logo: "java" },
	{ lang: "cpp", level: "w-1/3", logo: "cpp" },
];

const CodeComponent = ({ lang, level, logo }: ICodeComponent) => {
	const fLevel =
		level === "w-full" ? "100%" : level === "w-2/3" ? "66.6%" : "33.3%";

	return (
		<motion.div
			className="w-full md:w-[460px] h-20 rounded-lg p-2 mt-4 bg-gray-800 flex flex-row relative overflow-hidden"
			whileHover={{ scale: 1.05 }}
		>
			<img
				src={`/asset/langs/${logo}.png`}
				className={`rounded-md h-auto w-20 ml-r my-auto`}
			/>
			<p className={`text-white mt-[21px] ml-4 flex flex-row ${logo === "java" || logo === "cpp" ? "ml-6" : ""}`}>
				{lang.charAt(0).toUpperCase() + lang.substring(1)}
			</p>
			<div className="hidden md:flex bg-gray-800 h-2 w-60 my-auto rounded-full absolute right-4 top-[44%]">
				<motion.div
					animate={{ width: fLevel }}
					transition={{ duration: 2 }}
					className="bg-teal-500 rounded-full"
				></motion.div>
			</div>
		</motion.div>
	);
};

export default About;