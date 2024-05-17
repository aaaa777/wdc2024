# wdc2024

## TODO
- [x] スライドページの作成
- [ ] ユーザ操作可能なスライドページの作成
### Optional
- [ ] Github pagesとActionsの設定 

## Note
- animeSequenceの{"action": "break", "desc": "説明"}の説明は一つ前のbreakから離れたタイミングで適用される仕様です

### SSGから相対パスへの置換リスト
`out/`下限定で実行
- `"./"` -> `"./index.html"`
- `"./bubble-sort"` -> `"./bubble-sort.html"`
- `"./comb-sort"` -> `"./comb-sort.html"`
- `"./insertion-sort"` -> `"./insertion-sort.html"`
- `"./shaker-sort"` -> `"./shaker-sort.html"`
- `"/_next` -> `"./_next`