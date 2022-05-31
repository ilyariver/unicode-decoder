export const encoder = {
	hexEncode(value) {
		let hex, i
		let result = ''

		for (i = 0; i < value.length; i++) {
			const currentSymbol = value.split('')[i]
			const onlyCyrillic = /[^а-яё\s]/gi.test(currentSymbol)

			hex = !onlyCyrillic ? value.charCodeAt(i).toString(16) : currentSymbol
			if (!onlyCyrillic) {
				hex = value.charCodeAt(i).toString(16) === '20' ? (`\\x` + hex) : ('\\u0' + hex)
			} else {
				hex = currentSymbol
			}
			result += hex

		}
		return result
	}
}
