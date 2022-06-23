import urlMetadata from "url-metadata";

export async function urlMetadataInfo(url) {

	let urlData = [];
	
    await urlMetadata(url)
		.then(
			function (metadata) {
				urlData = {
					"url": {
						"link": metadata.url,
						"title": metadata.title,
                        "image": metadata.image,
						"description": metadata.description						
					}
				};
			},
			function (error) {
				console.log(`url-metadata error ${error}`);
				urlData = {
					"url": {
						"link": url,
						"title": url,
                        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png",
						"description": "ERROR: URL not found"						
					}
				};
			})

	return urlData;
}
