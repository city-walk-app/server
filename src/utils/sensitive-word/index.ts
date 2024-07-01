import data1 from './libs/data-1'
import data2 from './libs/data-2'

interface TrieNode {
  children: { [key: string]: TrieNode }
  isEndOfWord: boolean
  fail?: TrieNode
}

export class SensitiveWord {
  _instance: SensitiveWord
  root: TrieNode

  constructor() {
    const words = [...data1.sensitiveWords, ...data2.sensitiveWords]
    this.root = this.buildTrie(words)
    this.buildFailureLinks()
  }

  // public static get instance() {
  //   if (!SensitiveWord._instance) {
  //     SensitiveWord._instance = new SensitiveWord()
  //   }
  //   return SensitiveWord._instance
  // }

  buildTrie(words: string[]): TrieNode {
    const root: TrieNode = { children: {}, isEndOfWord: false }

    for (const word of words) {
      let node = root
      for (const char of word) {
        if (!node.children[char]) {
          node.children[char] = { children: {}, isEndOfWord: false }
        }
        node = node.children[char]
      }
      node.isEndOfWord = true
    }
    return root
  }

  buildFailureLinks() {
    const root = this.root
    const queue: TrieNode[] = []

    for (const key in root.children) {
      root.children[key].fail = root
      queue.push(root.children[key])
    }

    while (queue.length) {
      const node = queue.shift()
      if (!node) continue

      for (const key in node.children) {
        const child = node.children[key]
        let fail = node.fail

        while (fail && !fail.children[key]) {
          fail = fail.fail
        }
        child.fail = fail ? fail.children[key] : root

        if (child.fail.isEndOfWord) {
          child.isEndOfWord = true
        }

        queue.push(child)
      }
    }
  }

  public validater(text: string): boolean {
    let node = this.root

    for (const char of text) {
      while (node && !node.children[char]) {
        node = node.fail
      }
      if (!node) {
        node = this.root
        continue
      }
      node = node.children[char]
      if (node.isEndOfWord) {
        return true
      }
    }

    return false
  }
}
