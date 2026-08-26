---
title: 'Transplanting a Tap-to-Pay Chip Between Watch Straps'
date: '2026-08-25'
categories:
    - 'hardware'
    - 'diy'
    - 'watches'
coverImage: '/images/blog/tappy-transplant/finished-watch.jpg'
coverWidth: 2
coverHeight: 1
excerpt: Timex Pay is dead, but the chip in the strap still works. So I cut it out and sewed it into a strap that fits my other watch.
---

<script>
	import Callout from '$lib/components/Callout.svelte';
</script>

## The Problem

I don't like smartwatches. I don't want to charge my watch, and I don't want notifications on my wrist. I want to wear nice, dumb watches.

But I _do_ want the one smartwatch trick that's actually useful: tapping my wrist at transit gates and card readers instead of digging out my wallet.

The way I did this was a [Timex Pay](https://www.timex.com) watchband - a normal leather strap with a contactless payment chip embedded inside it. No battery, no pairing, no app on the watch. The strap _is_ the card.

<img class="inline" alt="The back of the Timex Pay strap, showing the contactless payment logo" src="/images/blog/tappy-transplant/timex-strap-back.jpg" />

<!-- TODO: how you provisioned it / which bank, and what "deprecated" means here - can you still manage the card? -->

The problem: Timex Pay is seemingly deprecated, so no new straps. And the strap I have is sized for a smaller watch - not the watch I actually wear these days, which takes a 22mm band.

The chip doesn't care what strap it lives in, though. It's a passive NFC device. So: surgery.

## The Donor

The Timex Pay strap, conveniently, tells you roughly where the chip is - the contactless logo is printed right on top of it.

<img class="inline" alt="A 22mm replacement strap next to the Timex Pay strap and a quick-release spring bar" src="/images/blog/tappy-transplant/strap-comparison.jpg" />

Armed with a scalpel, I cut the stitching and peeled the strap apart layer by layer. It's a sandwich: leather top, a foam/fiber core, the chip, and the lining. The layers are glued and stitched, so this is a one-way operation - the donor strap does not survive.

<img class="inline" alt="The Timex Pay strap dissected into its layers, with the chip extracted" src="/images/blog/tappy-transplant/strap-dissected.jpg" />

Here's the prize: a flexible PCB with a printed antenna coil and one blob-topped secure element. This whole thing is the "card."

<img class="inline" alt="Close-up of the extracted NFC payment module - a flex PCB with a printed antenna and a single chip" src="/images/blog/tappy-transplant/chip-closeup.jpg" />

<Callout>
The chip is powered entirely by the reader's field through that antenna coil. Don't crease the flex PCB or nick the coil traces - that's the whole radio.
</Callout>

## The Recipient

The new strap is a generic 22mm leather band with quick-release spring bars.

<!-- TODO: link the actual strap you bought -->

With the same scalpel, I cut a slit in the lining - the side that faces your wrist - and worked a pocket open between the lining and the top leather.

<img class="inline" alt="A slit cut into the lining of the new strap, forming a pocket" src="/images/blog/tappy-transplant/pocket-cut.jpg" />

<!-- TODO: placement decisions - did you match where Timex put it (top of wrist)? Any glue? -->

Then the chip goes in, and the slit gets sewn back shut.

<img class="inline" alt="Sewing the strap lining closed with needle and thread" src="/images/blog/tappy-transplant/sewing.jpg" />

<img class="inline" alt="The finished stitching on the back of the new strap" src="/images/blog/tappy-transplant/stitched-back.jpg" />

My stitching will not win any awards[^1], but it's on the inside of the strap. Nobody sees it but me and the card reader.

## The Result

It works. Tap the strap on a terminal and it pays, same as before - just on a strap that actually fits a nice dumb watch.

<img class="inline" alt="The finished watch on the transplanted strap" src="/images/blog/tappy-transplant/result-watch.jpg" />

<!-- TODO: how well does it read in practice? Any difference in tap reliability vs the original strap? Durability after ~2 months? -->

[^1]: TODO: joke or note about the sewing job goes here.
