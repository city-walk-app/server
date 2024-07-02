import { sensitiveWords } from './data'

interface TrieNode {
  children: { [key: string]: TrieNode }
  isEndOfWord: boolean
  fail?: TrieNode
}

/**
 * 检测字符串中是否包含敏感词
 *
 * 实现了 Aho-Corasick 自动机，该自动机是一种高效的多模式匹配算法
 */
export class SensitiveWord {
  private static _instance: SensitiveWord
  private root: TrieNode

  /**
   * 私有构造函数，初始化 Trie 树和失败指针
   */
  private constructor() {
    this.root = this.buildTrie(sensitiveWords)
    this.buildFailureLinks()
  }

  /**
   * 获取单例实例
   */
  public static get instance() {
    if (!SensitiveWord._instance) {
      SensitiveWord._instance = new SensitiveWord()
    }
    return SensitiveWord._instance
  }

  /**
   * 构建 Trie 树
   *
   * @param words 敏感词数组
   * @returns Trie 树根节点
   */
  private buildTrie(words: string[]): TrieNode {
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

  /**
   * 构建失败指针
   */
  private buildFailureLinks() {
    const root = this.root
    const queue: TrieNode[] = []

    // 初始化根节点的子节点的失败指针为根节点
    for (const key in root.children) {
      root.children[key].fail = root
      queue.push(root.children[key])
    }

    // BFS 构建失败指针
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

        // 如果失败指针指向的节点是敏感词的结尾，标记当前节点为敏感词结尾
        if (child.fail.isEndOfWord) {
          child.isEndOfWord = true
        }

        queue.push(child)
      }
    }
  }

  /**
   * 校验文本中是否包含敏感词
   *
   * @param text 待校验的文本
   * @returns 是否包含敏感词
   */
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
