export function useParsedEscapedString(input: string): string {
  const lineFeedPattern = new RegExp('\\\\n', 'g')
  const singleQuotePattern = new RegExp("\\\\'", 'g')

  const newlineReplacement = `\n`
  const singleQuoteReplacement = `'`

  let intermediateResult = input.replace(lineFeedPattern, newlineReplacement)
  return intermediateResult.replace(singleQuotePattern, singleQuoteReplacement)
}
