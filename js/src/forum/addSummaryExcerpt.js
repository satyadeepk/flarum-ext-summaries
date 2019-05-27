import { extend } from 'flarum/extend';
import app from 'flarum/app';
import DiscussionList from 'flarum/components/DiscussionList';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import { truncate } from 'flarum/utils/string';

export default function addSummaryExcerpt() {
    extend(DiscussionList.prototype, 'requestParams', function(params) {
        params.include.push('firstPost');
    });

    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        const discussion = this.props.discussion;

        const firstPost = discussion.firstPost();
        const excerptLength =
            app.forum.attribute('flarum-ext-summaries.excerpt_length') || 200;

        if (firstPost) {
            const firstPostHtml = firstPost.contentHtml();
            const reg = /img src="(.*?)"/;

            const match = firstPostHtml && firstPostHtml.match(reg);
            const firstImageUrl = match && match[1];
            console.log(firstPostHtml, firstImageUrl);
            //       const excerpt = <span>{truncate(firstPost.contentPlain(), excerptLength)}</span>;
            if (firstImageUrl) {
                const excerpt = <img src={firstImageUrl} width="200" />;
                items.add('excerpt', excerpt, -100);
            }
        }
    });
}
