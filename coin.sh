#!/bin/bash
coins=("0x" "1inch" "aave-token" "alchemy-pay" "algorand" "amp" "ampleforth-governance-token" "ankr-network" "apecoin-ape" "avalanche" "axie-infinity" "balancer" "bancor" "band-protocol" "barnbridge" "basic-attention-token" "biconomy" "bitcoin-cash" "bitcoin" "bluzelle" "bonfida" "cardano" "cartesi" "celo" "chainlink" "chiliz" "clover-finance" "compound" "cosmos" "coti" "cronos" "curve" "dash" "decentraland" "dogecoin" "elrond-egold" "enjin-coin" "eos" "ethereum-classic" "ethereum-name-service" "ethereum" "fetch-ai" "filecoin" "flow" "gala" "gods-unchained" "gst" "idex" "iexec-rlc" "immutable-x" "insights-network" "internet-computer" "jasmy" "keep-network" "kyber-network-crystal" "litecoin" "livepeer" "loopring" "maker" "mask-network" "matic-network" "melon" "mina-protocol" "mirror-protocol" "nucypher" "numeraire" "omisego" "orchid-protocol" "origin-protocol" "perpetual-protocol" "polkadot" "quant-network" "radicle" "ren" "render-token" "request-network" "ripple" "shiba-inu" "skale-network" "solana" "spell-token" "stellar" "step-app" "storj" "superfarm" "sushi" "synthetix" "tezos" "the-graph" "the-sandbox" "tribute" "unifi-protocol-dao" "uniswap" "universal-dollar" "yearn-finance")
changes=()
for coin in "${coins[@]}"; do
  url="https://coincodex.com/crypto/${coin}/price-prediction/"
  cc=$(curl --silent -L $url)
  pred=$(echo "$cc" | grep "meta name=\"description\"" | head -1 )
  change=$(echo "$pred" | grep -o -E "[-0-9.]{2,6}" | head -1 )
  changes+=($change)
done
max=${changes[1]}
for i in "${changes[@]}"; do
  if (( $(echo "$i > $max" | bc -l) )); then
    max=$i
  fi
done
index=$(printf '%s\n' "${changes[@]}" | grep -n "$max" | cut -d ":" -f 1)
echo "${coins[$index]} (${max})"
