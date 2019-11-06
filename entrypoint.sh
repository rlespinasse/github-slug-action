#!/bin/sh -l

slug_ref() {
    echo $1 \
         | tr A-Z a-z \
         | sed -r 's#refs/.*/##;s/[~\^]+//g;s/[^a-zA-Z0-9]+/-/g;s/^-+\|-+$//g' \
         | cut -c1-63
}

echo ::set-env name=GITHUB_REF_SLUG::$(slug_ref $GITHUB_REF)
echo ::set-env name=GITHUB_HEAD_REF_SLUG::$(slug_ref $GITHUB_HEAD_REF)
