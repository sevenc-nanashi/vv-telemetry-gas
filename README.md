# Voicevox 辞書収集機構 / vv-telemetry-gas

GAS 上で辞書を収集するためのスクリプト。
`config.example.ts`、`.clasp.example.json`をコピーして、それぞれ`config.ts`、`.clasp.json`を作成し、適切に設定してください。
[clasp](https://github.com/google/clasp)、[pnpm](https://pnpm.io/)が必要です。
clasp は`clasp login`でログインしておく必要があり、実際にデプロイするには GAS の API を有効にし、またデプロイ先の GAS プロジェクトにスプレッドシートを作成しておく必要があります。

## ビルド

```
pnpm build
```

## デプロイ

```
pnpm push
```
