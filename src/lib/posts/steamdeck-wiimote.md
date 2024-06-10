---
title: 'Wiimotes, the Steam Deck, and Dolphin'
date: '2023-06-18'
updated: '2023-09-13'
categories:
    - 'steamdeck'
    - 'hardware'
    - 'wii'
coverImage: '/images/blog/steamdeck-wiimote/wiideck.png'
coverWidth: 10
coverHeight: 5
excerpt: This post explains how to get wiimotes working with a Steam Deck
---

<script>
	import Callout from '$lib/components/Callout.svelte';
</script>

<Callout>
Note: I dumped these games using a homebrewed Wii from original disks. I'm not endorsing piracy in this article.
</Callout>

## The Beginning

So, the Wii and associated bits are somewhat an old piece of hardware these days.
For most of my gaming needs, I end up using my Steam Deck or desktop computer - which are great.

However, I'm really a fan of _not sitting down all the time_ - which is kinda what the Wii is all about.
But, it's yet another thing that I have to plug into the TV, and the bits like the component video cables are showing their age.

So, Naturally™️ I need to ✨declutter my life✨ and emulate the Wii on the Steam Deck. One less thing to worry about.

<img class="inline" align="right" alt="Wiimote" src="/images/blog/steamdeck-wiimote/wiimote.png" />

However, the Wii is a complex piece of hardware. Emulating it these days is easy enough with [Dolphin](https://dolphin-emu.org/),
but the _wiimotes_ are another story. They have an infrared camera, and accelerometer, and potentially[^1] a gyroscope.

But, the weirdest part is that these complicated little sticks do this all over **_Bluetooth_**. Yes, these controllers released in <u>2006</u>.

Naturally, they're a bit funky about it, but that means they can (at least in theory[^2]) work with modern devices! 🎉

So, I naturally tried to do it the dumb way (basic controller pairing), and... Nope. A less naïve approach would be needed.

## The Problem

So, it turns out that we don't want Steam Input to bind to the Wiimotes.

It turns out what we want to happen is for Dolphin to take over the Bluetooth stack and talk with the controllers itself.

## The Solution

### Linux Setup

First, we need to modify SteamOS to allow Dolphin to use [Bluetooth Passthrough](https://wiki.dolphin-emu.org/index.php?title=Bluetooth_Passthrough#Linux) properly.
You'll need to add a `sudo` password via `passwd` if you haven't already.

To disable the read-only protection (❗potentially dangerous ❗):

```sh
sudo steamos-readonly disable
```

Then, we need to go to: `/etc/udev/rules.d/` and create a new file named `52-dolphin.rules`.
The contents should be:

```
# Wiimotes
SUBSYSTEM=="usb", ATTRS{idVendor}=="057e", ATTRS{idProduct}=="0306", TAG+="uaccess"
SUBSYSTEM=="usb", ATTRS{idVendor}=="057e", ATTRS{idProduct}=="0330", TAG+="uaccess"
```

The first is for original (white/black) controllers, the second is the Motion Plus (blue) one.
<Callout>
If you use different or non-genuine controllers (no Wii logo), you'll need to get the <b>V</b>endor <b>ID</b> and <b>P</b>roduct <b>ID</b>. This can be found in a lot of different ways.
I connected them to Windows and used Device Manager -> Details -> Hardware IDs.
</Callout>

Then, you can reload the rules as [here](https://wiki.dolphin-emu.org/index.php?title=Bluetooth_Passthrough#Linux), but I would just reboot the Deck to be sure.

Once that is done, you can re-enable the read-only protection.

```sh
sudo steamos-readonly enable
```

After that, it's time to set up Dolphin properly.

### Dolphin Setup

Go into Desktop Mode and open Dolphin. If you don't have it installed already, do so. I recommend [Emudeck](https://emudeck.com).

In Dolphin, open the `Controller Settings` dialog, then select the "Passthrough a Bluetooth adapter" option in the Wii Remotes section.

You'll want an easy way to sync the controllers to the Deck, as they won't automatically connect. Under `Hotkey Settings`, go to `Wii and Wii Remote`.

Then, you'll want to bind a button of your choice to the `Press Sync Button` option.
I chose a back paddle button[^3]. I would also bind `General -> Toggle Fullscreen` while you're here.

<Callout>
If the button you want isn't bound to anything yet, you need to open up Steam and set it there. Go to Steam -> Settings -> Controller -> Desktop Layout.
</Callout>

For the next part, you'll have to have a game running while you do this. I recommend having `Graphics Settings -> Start in Fullscreen` unchecked.

-   Press the actual sync button[^4] on the controller.
-   Press your bound 'sync' button on the Steam Deck every few seconds.

That's it! It should just work. For me, all Wiimote functionality including the speakers worked, besides remembering the pairing.

[^1]: Gyroscopes are included in the Motion Plus controllers (or extensions).

[^2]: The nightmare of Bluetooth protocol stacks will not be covered here, thankfully.

[^3]: Well, these days I actually use the back paddle on my Steam Controller.

[^4]: Pressing 1+2 (for 'One Time Mode') hasn't worked for me.
