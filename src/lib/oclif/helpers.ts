import chalk from "chalk";

export const generateSpacingPrefix = (level: number, final?: boolean) => {
  const preSpaces = level > 1 ? `  `.repeat(level - 1) : "";
  const markerChar = final ? "└" : "├";
  return chalk.gray(`${preSpaces}${markerChar}`);
};

export const deviceStatusHelper = (key: string, value: string, options = { level: 1, isLast: false }) => {
  const prefix = generateSpacingPrefix(options.level, options.isLast);
  return `${prefix} ${chalk.bold(key)}: ${chalk.gray(value)}`;
};