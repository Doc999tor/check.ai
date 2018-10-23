class VastViewXML {
	/**
	 * returns a complete vast xml
	 * capable to return more than one MediaFile node
	 * can be easily replaced by any xml2js library builder
	 * @param  {vast[]} vasts
	 * @return {string}       xml
	 */
	static createVastXML (vasts) {
		const mediaFilesString = vasts.reduce(
			(str, vast) => str + VastViewXML.createMediaFileNode(vast),
			''
		);
		const xmlString = `
			<VAST version="2.0">
				<Ad id="ComboGuard">
					<InLine>
						<AdSystem>2.0</AdSystem>
						<Impression/>
						<Creatives>
							<Creative>
								<Linear>
									<Duration>00:00:19</Duration>
									<MediaFiles>${mediaFilesString}</MediaFiles>
								</Linear>
							</Creative>
						</Creatives>
					</InLine>
				</Ad>
			</VAST>
		`;
		return xmlString;
	}

	/**
	 * a static method creates one MediaFile xml node
	 * @param  {videoId: number, vast: url(string), position: enum(string), hideUi: 0/1} vast
	 * @return {string}      xml node
	 */
	static createMediaFileNode (vast) {
		const nodeString = `
			<MediaFile type="application/x-shockwave-flash" apiFramework="VPAID" height="168" width="298" delivery="progressive">
				<![CDATA[
					http://localhost/ComboWrapper.swf?${VastViewXML.flatobj2urlencoded(vast)}
				]]>
			</MediaFile>
		`;
		return nodeString;
	}

	/**
	 * converts flat hash map to urlencoded string
	 * @param  {Object} o flat hash map
	 * @return {String}   urlencoded string
	 */
	static flatobj2urlencoded (o) {
		return Object.keys(o).map(k => k + '=' + encodeURIComponent(o[k])).join('&');
	}
}

module.exports = VastViewXML;
