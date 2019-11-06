#!/bin/sh -l

echo ::set-env name=GITHUB_REF_SLUG::$(echo $GITHUB_REF | tr A-Z a-z | sed -r 's#refs/.*/##;s/[~\^]+//g;s/[^a-zA-Z0-9]+/-/g;s/^-+\|-+$//g' | cut -c1-63)
