<svelte:head>

<title>Resume</title>
</svelte:head>

# Resume

<script>
	import * as pdfjs from "pdfjs-dist";
	export async function loadPDF(node, data) {
		pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
		const loadingTask = pdfjs.getDocument(data.url);
		const pdf = await loadingTask.promise;
		const page = await pdf.getPage(1);
		const scale = 1.15 * (window.innerWidth / 1300);
		const viewport = page.getViewport({ scale });
		const canvas = node;
		const context = canvas.getContext("2d");

		canvas.height = viewport.height;
		canvas.width = viewport.width;

		const renderContext = {
			canvasContext: context,
			viewport: viewport,
		};

		await page.render(renderContext);
	}
</script>

<div class="page-resume">
	(A bit out of date)
	<br />
	Last Updated: <code>2023</code>
	<br />
	<canvas use:loadPDF="{{ url: '/assets/KaiRichardson-Resume.pdf' }}"></canvas>
</div>
