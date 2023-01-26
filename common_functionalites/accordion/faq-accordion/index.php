<?php

$accordionItens = include_once('_accordionItens.php');

$accordionHasItens = isset($accordionItens) && count($accordionItens) > 0;

if (!$accordionHasItens) return;

$accordionCounter = 0;
?>

<div class="pageSection imgTextPageSection" id="onePageFaq" data-anima="center-down">
    <div class="imgTextHeader headerSection">
        <h3 class="headerTitle">Perguntas Frequentes</h3>
    </div>
    <div data-js="accordion" class="accordion">
        <?php foreach ($accordionItens as $accordionItem) :
            $itemTitle = indexParamExistsOrDefault($accordionItem, 'title');
            $itemContent = indexParamExistsOrDefault($accordionItem, 'content');
        ?>
            <?php $accordionCounter++; ?>
            <div class="accordion-item">
                <button data-accordion-header="<?= $accordionCounter ?>" data-js="accordion-header" class="accordion-header">
                    <strong data-accordion-header="<?= $accordionCounter ?>"><?= $itemTitle ?></strong>
                    <?php /* <i data-accordion-header="<?= $accordionCounter ?>" class="fas fa-angle-down"></i> */ ?>
                    <svg viewBox="0 0 330 330" xmlns="http://www.w3.org/2000/svg" data-accordion-header="<?= $accordionCounter ?>">
                        <path d="m325.61 79.393c-5.857-5.857-15.355-5.858-21.213 1e-3l-139.39 139.39-139.4-139.39c-5.857-5.857-15.355-5.858-21.213 1e-3 -5.858 5.858-5.858 15.355 0 21.213l150 150c2.813 2.813 6.628 4.393 10.606 4.393s7.794-1.581 10.606-4.394l150-150c5.859-5.857 5.859-15.355 1e-3 -21.213z" />
                    </svg>
                </button>
                <div data-accordion-body="<?= $accordionCounter ?>" class="accordion-body"><?= $itemContent ?></div>
            </div>
        <?php
        endforeach;
        ?>
    </div>
</div>