<svelte:head>

<title>Resume</title>
</svelte:head>

# Resume

<script>
	// Keep worker URL resolvable by Vite's static analysis at build time
	const workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;

	export async function loadPDF(node) {
		const pdfjs = await import('pdfjs-dist');
		pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

		const pdf = await pdfjs.getDocument({ url: '/assets/KaiRichardson-Resume.pdf' }).promise;
		const page = await pdf.getPage(1);
		// Natural PDF dimensions at scale 1 — used as the basis for all scaling
		const naturalViewport = page.getViewport({ scale: 1 });

		let currentRender = null;

		async function render() {
			// Cancel any render already in progress before starting a new one
			if (currentRender) {
				currentRender.cancel();
				currentRender = null;
			}

			const containerWidth = node.parentElement?.clientWidth ?? window.innerWidth;
			const dpr = window.devicePixelRatio || 1;
			const scale = (containerWidth / naturalViewport.width) * dpr;
			const viewport = page.getViewport({ scale });

			// Physical canvas pixels (sharp on HiDPI screens)
			node.width = viewport.width;
			node.height = viewport.height;
			// CSS display size stays at the logical container width
			node.style.width = '100%';
			node.style.height = 'auto';

			const context = node.getContext('2d');
			context.clearRect(0, 0, node.width, node.height);

			currentRender = page.render({ canvasContext: context, viewport });
			try {
				await currentRender.promise;
			} catch (e) {
				if (e?.name !== 'RenderingCancelledException') throw e;
			} finally {
				currentRender = null;
			}
		}

		await render();

		// Re-render whenever the container is resized (handles orientation changes too)
		const observer = new ResizeObserver(() => render());
		observer.observe(node.parentElement ?? node);

		return {
			destroy() {
				observer.disconnect();
				if (currentRender) currentRender.cancel();
			}
		};
	}
</script>

<div class="page-resume">
	<br />
	Last Updated: <code>Feb. 2025</code>
	<br />
	<canvas use:loadPDF></canvas>
</div>
