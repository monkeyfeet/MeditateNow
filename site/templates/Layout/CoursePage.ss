<section class="page cf">

	<div class="inner">

		<main class="typography">

			<h1>$Title</h1>
			$Content
			$Form

			<% if Children %>
				<div class="audio">
					<% loop Children %>
						<a href="$Link" title="Go to {$Title}">
							<h3>$MenuTitle</h3>
							<P>$Intro</P>
						</a>
					<% end_loop %>
				</div>
			<% end_if %>

		</main>

	</div>

</section>