async function nuke() {
    async function unReact(button) {
        console.log(`🔌 Reaction button ${button.id} ("${button.ariaLabel}") status is ${button.ariaPressed}, unreacting...`);
        button.focus();
        button.click();
        await new Promise(r => setTimeout(r, 500));
    }

    async function unComment(button) {
        console.log(`🔌 Comment button stage 1 ${button.id}, clicking...`);
        button.focus();
        button.click();
        await new Promise(r => setTimeout(r, 1500));

        let actionSpan;
        for (const span of document.getElementsByTagName('span')) {
            if (
                span.getAttribute('class') === 'button-content-container display-flex align-items-center' &&
                span.outerText.trim() === 'Delete'
            ) {
                actionSpan = span;
                break;
            }
        }

        if (actionSpan == null) return;
        console.log(`🔌 Span button stage 2 ${actionSpan.outerText.trim()}, clicking...`);
        actionSpan.focus();
        actionSpan.click();

        let actionButton;
        for (const button of document.getElementsByTagName('button')) {
            if (
                button.getAttribute('class') === 'artdeco-button artdeco-button--2 artdeco-button--primary ember-view' &&
                button.outerText.trim() === 'Delete'
            ) {
                actionButton = button;
                break;
            }
        }

        if (actionButton == null) return;
        console.log(`🔌 Span button stage 3 ${actionButton.id}, clicking...`);
        actionButton.focus();
        actionButton.click();
    }

    let counter = 0;
    while (true) {
        console.log('🔌 Scrolling...');
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 1500));

        for (const button of document.getElementsByTagName('button')) {
            if (button.getAttribute('class').includes('comment-options-trigger')) {
                await unComment(button);
            }

            if (
                button.getAttribute('class').includes('social-actions-button') &&
                button.ariaPressed != null &&
                button.ariaPressed === 'true'
            ) await unReact(button);
        }

        counter += 1;
        if (counter === 10) {
            console.log('🔌 It is time to stop.')
            break;
        }
    }
}

nuke();